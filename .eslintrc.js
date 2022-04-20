module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
  },
  // parser: 'babel-eslint',
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": 0,
    "import/prefer-default-export": 0,
    "prefer-template": 0,
  },
};
