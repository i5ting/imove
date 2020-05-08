module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier', 'unicorn'],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'prettier/prettier': 'error',
    // 修复 tsx 文件引用 tsx 文件报错的问题
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-param-reassign': 'off',
        'import/extensions': [
          // airbnb 配置导致 tsx 文件引用一直报错
          'error',
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
          },
        ],
      },
    },
  ],
};
