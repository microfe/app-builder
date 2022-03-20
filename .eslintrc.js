module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    files: ['*.ts', '*.tsx'],
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        'react/prop-types': ['off'],
        'react-hooks/exhaustive-deps': [
          'warn', {
            'additionalHooks': 'useRecoilCallback'
          }
        ],
        'no-empty-pattern': ['off']
      },
    },
  ],
  rules: {
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'function-paren-newline': ['warn', 'multiline-arguments']
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'browser': true,
    'node': true
  }
};
