module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier/@typescript-eslint",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  env: {
    jest: true,
    es6: true,
    node: true
  },
  rules: {
    // 'dot-notation': ['error'],
    // '@typescript-eslint/no-explicit-any': 0,
    // '@typescript-eslint/explicit-function-return-type': 0,
    // '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/no-empty-function': 0,
    // '@typescript-eslint/camelcase': 0,
    // 'arrow-parens': ['error', 'always'],
    // 'object-shorthand': ['error', 'always'],
    // 'import/order': ['error', { 'newlines-between': 'always' }],
    // curly: 'error',
    // quotes: ['error', 'single', { avoidEscape: true }],
    // 'jsx-quotes': ['error', 'prefer-double'],
  }
};
