"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import { BRAND, TINT_PRICES, type TintCoverageId, type TintVehicleId } from "@/lib/constants";
import { cn } from "@/lib/utils";

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * The tint price tool, laid out the way Ricky asked for it (October 12,
 * 2026): what do you drive, which windows, then the price with the online
 * booking button right beside it. Every figure is his price sheet in
 * TINT_PRICES. Vans and big trucks are call for a quote. With JavaScript
 * off it shows the sedan, sides and back prices.
 */
export default function TintQuote() {
  const id = useId();
  const [vehicle, setVehicle] = useState<TintVehicleId>("sedan");
  const [coverage, setCoverage] = useState<TintCoverageId>("sides");
  const prices = vehicle === "van" ? null : TINT_PRICES.prices[vehicle][coverage];
  const vehicleLabel = TINT_PRICES.vehicles.find((v) => v.id === vehicle)?.label ?? "";
  const coverageLabel = TINT_PRICES.coverage.find((c) => c.id === coverage)?.label ?? "";

  return (
    <div className="viz tq">
      <div className="tq__steps">
        <div className="tq__step tq__step--vehicle" role="group" aria-labelledby={`${id}-vehicle`}>
          <p id={`${id}-vehicle`} className="tq__ask">
            <span className="tq__n">1</span>What do you drive?
          </p>
          <div className="viz__chips tq__chips">
            {TINT_PRICES.vehicles.map((v) => (
              <button key={v.id} type="button" className="viz__chip" aria-pressed={v.id === vehicle} onClick={() => setVehicle(v.id)}>
                <strong>{v.label}</strong>
                {v.note ? <span>{v.note}</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className={cn("tq__step tq__step--windows", !prices && "tq__step--off")} role="group" aria-labelledby={`${id}-windows`}>
          <p id={`${id}-windows`} className="tq__ask">
            <span className="tq__n">2</span>Which windows?
          </p>
          <div className="viz__chips tq__chips">
            {TINT_PRICES.coverage.map((c) => (
              <button
                key={c.id}
                type="button"
                className="viz__chip"
                aria-pressed={prices ? c.id === coverage : false}
                disabled={!prices}
                onClick={() => setCoverage(c.id)}
              >
                <strong>{c.label}</strong>
                <span>{c.note}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="tq__result" aria-live="polite">
        {prices ? (
          <>
            <p className="label">
              Your price · {vehicleLabel}, {coverageLabel.toLowerCase()}
            </p>
            <ul className="tq__films">
              {TINT_PRICES.films.map((f) => {
                const p = prices[f.id];
                return (
                  <li key={f.id} className={cn("tq__film", f.tag && "tq__film--pick")}>
                    <div className="min-w-0">
                      <p className="tq__name">
                        {f.name}
                        {f.tag ? <span className="tile__tag">{f.tag}</span> : null}
                      </p>
                      <p className="tq__note">{f.note}</p>
                    </div>
                    <p className="tq__price">
                      {p.sale ? (
                        <>
                          <span className="tq__sale">Sale</span>
                          <s className="tq__was" aria-label={`Regular price ${dollars(p.regular)}`}>
                            {dollars(p.regular)}
                          </s>
                        </>
                      ) : null}
                      <strong>{dollars(p.sale ?? p.regular)}</strong>
                    </p>
                    <Button href={BRAND.bookingUrl} size="sm" tone={f.tag ? "primary" : "ghost"} ariaLabel={`Book ${f.name.toLowerCase()} tint online, ${dollars(p.sale ?? p.regular)}`}>
                      Book online
                    </Button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="tq__call">
            <div className="min-w-0">
              <p className="tq__name">Vans and big trucks are priced by the vehicle.</p>
              <p className="tq__note">Call or text {BRAND.phoneDisplay} with the year, make and model, and we will give you a price.</p>
            </div>
            <div className="tq__call-actions">
              <Button href={BRAND.phoneHref} size="sm">
                Call {BRAND.phoneDisplay}
              </Button>
              <Button href={BRAND.phoneSms} size="sm" tone="ghost">
                Text us
              </Button>
            </div>
          </div>
        )}
        <p className="viz__note mt-4">
          Prices as of {TINT_PRICES.asOf}. Black carbon film and anything not listed here is priced with a{" "}
          <a href="#quote" className="link">
            free quote
          </a>
          . Michigan sets a limit for each window, and we will tell you what is allowed on yours before any film goes on.
        </p>
      </div>
    </div>
  );
}
