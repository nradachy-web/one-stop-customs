"""Split the magenta studio render into recolorable layers.

base:  the render with the paint replaced by neutral grey diffuse shading
mask:  white with alpha = paint coverage (for CSS mask-image)
gloss: specular highlights plus a studio horizon reflection, white on black (screen blend)
satin: the render's own soft highlights, white on black (screen blend)
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
W, H = im.size
# 2:1 crop, car centred vertically
CH = W // 2
top = int(sys.argv[3]) if len(sys.argv) > 3 else (H - CH) // 2
im = im.crop((0, top, W, top + CH))
a = np.asarray(im).astype(np.float32) / 255.0
R, G, B = a[..., 0], a[..., 1], a[..., 2]
mx = a.max(-1); mn = a.min(-1)
sat = np.where(mx > 1e-4, (mx - mn) / np.maximum(mx, 1e-4), 0)
# hue in degrees
d = np.maximum(mx - mn, 1e-6)
h = np.where(mx == R, ((G - B) / d) % 6, np.where(mx == G, (B - R) / d + 2, (R - G) / d + 4)) * 60
magenta = (h > 278) & (h < 345) & (R > G + 0.08) & (B > G + 0.04)

# soft coverage from saturation, gated by hue
soft = np.clip((sat - 0.18) / (0.45 - 0.18), 0, 1) * magenta
hard = soft > 0.5
hard = ndi.binary_closing(hard, structure=np.ones((5, 5)), iterations=2)
# fill only small holes (handles, seams); the windows and the fender vent stay out
holes = ndi.binary_fill_holes(hard) & ~hard
hl, hn = ndi.label(holes)
hs = ndi.sum(holes, hl, range(1, hn + 1))
for i, sz in enumerate(hs, start=1):
    if sz < 220:
        hard |= hl == i
# weakly magenta pixels in shadow (the lower sill) that sit between paint on the same row are paint too
relaxed = (h > 278) & (h < 345) & (R > G + 0.02) & (B >= G) & (sat > 0.07)
hard |= relaxed & ndi.binary_closing(hard, structure=np.ones((1, 61)))
lab, n = ndi.label(hard)
sizes = ndi.sum(hard, lab, range(1, n + 1))
keep = np.zeros_like(hard)
for i, s in enumerate(sizes, start=1):
    if s > 30:
        keep |= lab == i
hard = keep
# alpha: hard core, soft edge from the saturation ramp inside a 2px band
band = ndi.binary_dilation(hard, iterations=2) & ~ndi.binary_erosion(hard, iterations=2)
alpha = np.where(band, np.maximum(soft, 0) * ndi.binary_dilation(hard, iterations=2), hard.astype(np.float32))
alpha = np.clip(alpha, 0, 1)
alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255.0

# specular (whitening) and diffuse shading inside the paint
inside = hard
Gbase = np.percentile(G[inside], 40)
S = np.clip(G - Gbase, 0, 1)
S = ndi.gaussian_filter(S, 0.8)
D = (R + B) / 2 - S
D = ndi.gaussian_filter(D, 0.5)
hi = np.percentile(D[inside], 97)
lo = np.percentile(D[inside], 1)
Dn = np.clip((D - lo) / (hi - lo), 0, 1)
Dn = 0.10 + 0.86 * Dn ** 1.1

# clean plate: fill the paint and its edge band from the nearest outside pixel
grow = ndi.binary_dilation(hard, iterations=4)
_, (iy, ix) = ndi.distance_transform_edt(grow, return_indices=True)
plate = a[iy, ix]
plate = np.where(grow[..., None], ndi.gaussian_filter(plate, (2, 2, 0)), a)

lum = (0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2])[..., None]
spill = (((h > 270) & (h < 350)) & (sat > 0.03))[..., None]
# saturated paint slivers too small to matter are recolored as paint, not greyed

a_clean = np.where(spill, lum, a)
plate = np.where(spill, (0.299 * plate[..., 0:1] + 0.587 * plate[..., 1:2] + 0.114 * plate[..., 2:3]), plate)
grey = np.repeat(Dn[..., None], 3, -1)
# behind the paint: the clean plate only where an edge pixel still carries magenta, the desaturated render elsewhere (trim, shadowed sills)
contam = (((h > 270) & (h < 350)) & (sat > 0.25) & (alpha > 0.02) & (ndi.distance_transform_edt(~hard) < 3))[..., None]
behind = np.where(contam, plate, a_clean)
base = alpha[..., None] * grey + (1 - alpha[..., None]) * behind
# keep the untouched render outside the grown band
base = np.where(grow[..., None], base, a_clean)

# satin highlights: the render's own soft whitening, normalised
Sn = S[inside]
s_hi = np.percentile(Sn, 99.5) if Sn.size else 1
satin = np.clip(S / max(s_hi, 1e-3), 0, 1) ** 1.2 * 0.55 * alpha

# gloss: sharper highlights plus a studio horizon reflection on the body sides
ys, xs = np.nonzero(hard)
gloss_h = np.zeros_like(S)
# one continuous studio horizon: measured down from the smoothed top of the lowest paint run
y0 = np.full(W, np.nan); y1 = np.full(W, np.nan)
for x in range(W):
    c = np.nonzero(hard[:, x])[0]
    if not c.size:
        continue
    runs = np.split(c, np.nonzero(np.diff(c) > 1)[0] + 1)
    low = runs[-1]
    y0[x], y1[x] = low.min(), low.max()
xs_ok = np.nonzero(~np.isnan(y0))[0]
y0f = np.interp(np.arange(W), xs_ok, y0[xs_ok])
y0s = ndi.gaussian_filter1d(ndi.median_filter(y0f, size=121, mode="nearest"), 24)
side = (y1 - y0)[xs_ok]
Hside = float(np.median(side[side > 0.6 * side.max()]))
yy = np.arange(CH, dtype=np.float32)[:, None]
dd = (yy - y0s[None, :]) / Hside
up = np.clip(1 - np.abs(dd - 0.2) / 0.24, 0, 1) ** 1.5 * 0.34
ln = np.exp(-((dd - 0.43) / 0.012) ** 2) * 0.15
horiz = np.where(dd > -0.03, up + ln, 0.24).astype(np.float32)
horiz = ndi.gaussian_filter(horiz, (1.0, 3)) * hard
spec = np.clip(S / max(s_hi, 1e-3), 0, 1) ** 2.2 * 0.9
gloss = np.clip(horiz + spec, 0, 1) * alpha

# the render left a small blotch on the front sill (cropped x 586 to 636, y 510 to 538): bridge it across the row
def bridge(arr, x0=586, x1=636, y0=510, y1=538):
    L, Rr = arr[y0:y1, x0:x0 + 1], arr[y0:y1, x1:x1 + 1]
    w = np.linspace(0, 1, x1 - x0)[None, :]
    if arr.ndim == 3:
        w = w[..., None]
    arr[y0:y1, x0:x1] = L * (1 - w) + Rr * w
for arr in (base, gloss, satin, alpha):
    bridge(arr)

def save(arr, name):
    Image.fromarray((np.clip(arr, 0, 1) * 255).round().astype(np.uint8)).save(f"{out}/{name}")

save(base, "wrap-base.png")
m = np.zeros((CH, W, 4), np.uint8); m[..., :3] = 255; m[..., 3] = (alpha * 255).round().astype(np.uint8)
Image.fromarray(m, "RGBA").save(f"{out}/wrap-mask.png")
save(np.repeat(gloss[..., None], 3, -1), "wrap-gloss.png")
save(np.repeat(satin[..., None], 3, -1), "wrap-satin.png")
print("crop top", top, "size", W, CH, "paint px", int(hard.sum()), "Gbase", round(float(Gbase), 3), "D lo/hi", round(float(lo), 3), round(float(hi), 3))
