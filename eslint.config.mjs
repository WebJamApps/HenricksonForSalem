import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import vitest from '@vitest/eslint-plugin';
import n from 'eslint-plugin-n';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import promise from 'eslint-plugin-promise';
import json from 'eslint-plugin-json';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';

// jsx-a11y-x recommended rules, enforced as errors.
// Defensive: the v0.2.0 recommended preset lists rules it doesn't actually
// define (e.g. label-has-for), which crashes ESLint — so only enable rules the
// plugin really exports.
const a11yRules = Object.fromEntries(
  Object.keys(jsxA11yX.configs.recommended.rules)
    .filter((name) => name.replace('jsx-a11y-x/', '') in jsxA11yX.rules)
    .map((name) => [name, 'error']),
);

// Take the SonarJS recommended ruleset but downgrade every rule to 'warn'
// (preserving any per-rule options) so it surfaces issues without failing CI.
const sonarjsWarn = Object.fromEntries(
  Object.entries(sonarjs.configs.recommended.rules).map(([name, val]) => [
    name, Array.isArray(val) ? ['warn', ...val.slice(1)] : 'warn',
  ]),
);

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'vite.config.ts',
      'eslint.config.mjs',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  js.configs.recommended,
  {
    ...unicorn.configs['flat/recommended'],
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
  },
  {
    ...promise.configs['flat/recommended'],
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { sonarjs },
    rules: sonarjsWarn,
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'import-x': importX,
      n,
      security,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-useless-assignment': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-len': ['error', { code: 150 }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'sonarjs/no-small-switch': 'off',
      'sonarjs/public-static-readonly': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-empty-file': 'off',
      'unicorn/default-export-style': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/prefer-observer-apis': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-top-level-side-effects': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/catch-error-name': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-await': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-this-outside-of-class': 'off',
      'unicorn/prefer-promise-with-resolvers': 'off',
      'unicorn/no-incorrect-query-selector': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/prefer-global-number-constants': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
      'unicorn/dom-node-dataset': 'off',
      'unicorn/prefer-modern-dom-apis': 'off',
      'unicorn/prefer-single-call': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/no-for-each': 'off',
      'unicorn/prefer-split-limit': 'off',
      'unicorn/prefer-simple-condition-first': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/no-array-reverse': 'off',
      'unicorn/prefer-includes': 'off',
      'unicorn/prefer-includes-over-repeated-comparisons': 'off',
      'unicorn/prefer-regexp-test': 'off',
      'unicorn/no-unreadable-array-destructuring': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-dom-node-replace-children': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/prefer-location-assign': 'off',
      'unicorn/prefer-early-return': 'off',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'jsx-a11y-x': jsxA11yX },
    rules: a11yRules,
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,jsx}', 'test/**/*.{ts,tsx,js,jsx}'],
    plugins: { vitest },
    languageOptions: {
      globals: { ...vitest.environments.env.globals },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-conditional-expect': 'off',
      'vitest/no-commented-out-tests': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unassigned-vars': 'off',
      'sonarjs/no-skipped-tests': 'off',
      'promise/param-names': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/dom-node-dataset': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    processor: 'json/json',
  },
];
