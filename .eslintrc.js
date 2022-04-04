module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "indent": [0, "tab"],
    "camelcase": [0, {
      "properties": "never"
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": 0,
    'semi': 0,
    "quotes": [1, "single"], //使用单引号，提示是警告
    "quotes": [0, "double"], //使用双引号，关闭
    'no-irregular-whitespace': 'off',
  }
}
