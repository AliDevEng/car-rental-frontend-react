import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/incompatible-library": "off",
    },
  },
];

export default config;
