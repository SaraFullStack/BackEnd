module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-compare-neg-zero": "error",
        "prefer-const": "error",
        "generator-star-spacing": "error",
        "array-bracket-newline": "error",
        "no-undef": "off",
        "no-unused-vars": "off"
    }
};