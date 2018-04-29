const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "demo.js"
  },
  devServer: {
    contentBase: "public"
  }
};
