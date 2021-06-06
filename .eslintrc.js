module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"]
};
