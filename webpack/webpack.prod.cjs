const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_URL": JSON.stringify(
        process.env.REACT_APP_API_URL
      ),
    }),
    new Dotenv({path: "./.env.prod"}),
  ],
};
