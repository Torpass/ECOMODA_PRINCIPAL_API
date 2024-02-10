module.exports = {
  extends: "airbnb-base-typescript-prettier",
  "env": {
      "es6": true,
      "browser": true
  },
  "rules": {
      "brace-style": [
          "error",
          "stroustrup"
      ],
      "comma-dangle": [
          "error",
          "never"
      ],
      "no-unused-vars": [
          "warn"
      ],
      "no-var": [
          "off"
      ],
      "one-var": [
          "off"
      ]
  }
}