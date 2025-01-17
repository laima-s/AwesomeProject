module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true, // Add this line to enable Jest globals
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Your custom rules
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
