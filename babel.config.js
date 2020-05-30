module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-transform-imports",
      {
        "react-bootstrap": {
          transform: "react-bootstrap/es/${member}", // eslint-disable-line no-template-curly-in-string
          preventFullImport: true
        },
        "redux-form": {
          transform: "redux-form/es/immutable/${member}", // eslint-disable-line no-template-curly-in-string
          preventFullImport: true
        }
      }
    ]
  ]
};
