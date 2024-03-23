module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-native/no-inline-styles': 0,
        'no-shadow': 'off',
        'no-undef': 'off',
        'object-curly-spacing': 'off', //['error', 'always'],
        '@typescript-eslint/no-unused-vars': 'error',
        'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
        'no-plusplus': 0,
        'prefer-destructuring': ['warn', { object: true, array: false }],
        'no-underscore-dangle': 0,
        '@typescript-eslint/no-var-requires': 0,
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/ban-ts-comment': [
          1,
          { 'ts-ignore': false, 'ts-nocheck': false },
        ],
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        radix: 0,
      },
    },
  ],
};
