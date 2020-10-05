module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"]
};
