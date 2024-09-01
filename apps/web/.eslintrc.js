/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: ["postcss.config.js"], // Specify the file(s) to override
      parser: "espree", // Use the default JavaScript parser for this file
      parserOptions: {
        project: null, // Disable TypeScript project parsing for this file
      },
    },
  ],
};
