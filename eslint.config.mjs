import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    ...eslint.configs.recommended,
    ...eslintConfigPrettier,
  },
  {
    files: ['client/**/*.js', 'client/**/*.jsx', 'client/**/*.ts', 'client/**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: 'readonly',
        JSX: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ...eslint.configs.recommended,
    ...eslintConfigPrettier,
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-useless-catch': 0,
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
  },
];
