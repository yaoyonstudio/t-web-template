module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    window: true,
    document: true,
    console: true,
    require: true,
    $: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'space-before-function-paren': 'off',
    'array-bracket-spacing': 'off',
  },
}
