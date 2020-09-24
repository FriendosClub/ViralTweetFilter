module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    browser: 'readonly',
    chrome: 'readonly',
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
  },
};
