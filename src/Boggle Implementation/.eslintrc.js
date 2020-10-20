module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "amd": true,
        "mocha": true,
        "jest": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "ecmaFeatures": {"jsx": true},
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "indent": ["error","tab"],
        "linebreak-style": ["error","unix"],
    }
}};
