import nextVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ships flat config: core-web-vitals is a plain array
// (base config plus @next/eslint-plugin-next core-web-vitals) that already
// ignores .next/ and out/. The *.nosync entries mirror tsconfig.json's excludes
// (out is a symlink to out.nosync in local builds).
const eslintConfig = [
  ...nextVitals,
  { ignores: ["out.nosync/**", ".next.nosync/**", "node_modules.nosync/**"] },
];

export default eslintConfig;
