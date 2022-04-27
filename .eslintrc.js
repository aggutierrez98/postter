const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    // "plugin:jsx-a11y/recommended",
    // "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": RULES.ERROR,
    "react/jsx-uses-vars": RULES.ERROR,
    "smart-tabs": RULES.OFF,
    "react/prop-types": RULES.OFF,
    "react/react-in-jsx-scope": RULES.OFF,
    "arrow-body-style": RULES.OFF,
    "react/no-unescaped-entities": RULES.OFF,
    "no-warning-comments": [
      0,
      {
        terms: ["todo", "fixme", "xxx"],
        location: "start",
      },
    ],
    "capitalized-comments": [
      0,
      {
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
    ],
  },
};
