module.exports = {
  extends: [
    'standard',
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
    "semi": [2, "always"],//语句强制分号结尾
    "semi-spacing": [0, { "before": false, "after": true }],//分号前后空格
    "no-var": 0,//禁用var，用let和const代替
    "no-use-before-define": 2,//未定义前不能使用
    "no-unused-expressions": 2,//禁止无用的表达式
  },
  overrides: [{
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
  },],
};