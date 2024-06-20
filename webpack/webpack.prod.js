const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      /*       "process.env.fullClassName": JSON.stringify("[hash:base64]"), */
    }),
    new Dotenv({path: "./.env.prod"}),
  ],
};
