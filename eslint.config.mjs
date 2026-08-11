import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

/**
 * The previous config extended @sanity/eslint-config-studio only — a package
 * that was not even installed — so `src/` was never linted. This covers the
 * site, the Studio schemas and the Netlify functions.
 *
 * react-hooks/exhaustive-deps is the rule that would have caught the
 * PageLoader effect never running.
 */
export default [
  {
    ignores: [
      'public/**',
      '.cache/**',
      'node_modules/**',
      'dist/**',
      '.sanity/**',
      'package-lock.json',
      // The Studio schemas are TypeScript and are checked by `tsc` (see
      // tsconfig.json); linting them here would need the whole
      // typescript-eslint stack for no additional signal.
      '**/*.ts',
      '**/*.tsx',
    ],
  },

  js.configs.recommended,

  // Browser-side React code
  {
    files: ['src/**/*.{js,jsx}', 'gatsby-browser.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      // Gatsby injects React automatically via the automatic JSX runtime.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Apostrophes in English prose are correct as written; JSX renders them
      // fine and escaping them makes the copy harder to edit.
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Node-side code: Gatsby config hooks, Netlify functions, scripts
  {
    files: [
      'gatsby-node.js',
      'gatsby-config.js',
      'gatsby-ssr.js',
      'netlify/**/*.js',
      'scripts/**/*.js',
      'test/**/*.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

]
