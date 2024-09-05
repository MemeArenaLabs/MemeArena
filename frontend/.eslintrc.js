/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/next.js",
    "plugin:prettier/recommended", // Add this line
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["prettier"], // Add this line
  rules: {
    "prettier/prettier": "error", // Add this line
  },
};
