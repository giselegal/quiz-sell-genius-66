module.exports = {
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off", // Desativado temporariamente
    "react-refresh/only-export-components": "off", // Desativado temporariamente
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unescaped-entities": "off", // Desativado temporariamente
    "@next/next/no-img-element": "off", // Desativado temporariamente
    "react/display-name": "off", // Desativado temporariamente
    "jsx-a11y/alt-text": "off", // Desativado temporariamente
    "import/no-anonymous-default-export": "off", // Desativado temporariamente
    "@next/next/no-html-link-for-pages": "error" // Manter este como error pois é crítico
  },
  "plugins": ["react-hooks", "react-refresh"]
};
