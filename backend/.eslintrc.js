const { FlatCompat } = require("@eslint/eslintrc");
const globals = require("globals");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname, // Mimics legacy directory-based resolution
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  js.configs.recommended, // Applies recommended ESLint rules directly

  // Translate legacy extends using the compatibility utility
  ...compat.extends("eslint-config-airbnb-base"),
  ...compat.extends("eslint-config-prettier"),

  // Main code linting configuration object
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,   // Enables Node.js runtime variables (like process, module)
        ...globals.es2021, // Enables ES2021 global variables
      },
    },
    rules: {
      // Custom project overrides
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },

  // Overrides target specific configurations (equivalent to old 'overrides' array)
  {
    files: [".eslintrc.{js,cjs}", "eslint.config.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.node,
      },
    },
  },
];
