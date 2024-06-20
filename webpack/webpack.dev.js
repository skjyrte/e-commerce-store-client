const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // other configurations
  plugins: [new Dotenv()],
};

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      /*       "process.env.fullClassName": JSON.stringify(
        "[path][name]__[local]--[hash:base64:5]"
      ), */
    }),
    new Dotenv({path: "./.env.dev"}),
  ],
};
