import { Linter } from 'eslint';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import playwrightPlugin from 'eslint-plugin-playwright';

const config = /** @type {Linter.Config} */ ({
  root: true,
  parser: typescriptEslintParser,
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended', // Uses the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:playwright/recommended', // Uses the recommended rules from eslint-plugin-playwright
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['@typescript-eslint', 'prettier', 'playwright'],
  rules: {
    'prettier/prettier': 'error', // Runs prettier as an ESLint rule and reports differences as individual ESLint issues.
    '@typescript-eslint/explicit-function-return-type': 'off', // Disables the rule for explicit return types on functions
    '@typescript-eslint/no-explicit-any': 'warn', // Warns when 'any' is used
    'no-console': 'warn', // Warns on console usage
    'no-unused-vars': 'warn', // Warns on unused variables
    'no-debugger': 'warn', // Warns on debugger usage
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
});

export default config;
