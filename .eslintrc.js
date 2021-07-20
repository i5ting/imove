module.exports = {
  extends: [
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }], // 修复 tsx 文件引用 tsx 文件报错的问题
    "no-var": 0,//禁用var，用let和const代替
    "no-use-before-define": 2,//未定义前不能使用
    "no-unused-expressions": 2,//禁止无用的表达式
    "space-before-function-paren": 'off',
    'comma-dangle': 'off',
    'import/extensions': 'off',
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
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
    },
  },],
};
