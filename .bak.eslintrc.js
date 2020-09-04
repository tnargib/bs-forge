const a11yOff = Object.keys(require("eslint-plugin-jsx-a11y").rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = "off";
  return acc;
}, {});

module.exports = {
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  extends: [
    // "airbnb-typescript",
    // "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    ...a11yOff,
    ////////////////////////////////////
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    ////////////////////////////////////
    "react/prop-types": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/button-has-type": "off",
    "react/destructuring-assignment": "off",
    ////////////////////////////////////
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-restricted-syntax": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
