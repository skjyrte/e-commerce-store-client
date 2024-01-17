const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true, //redirects 404s to /index.html
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      /*       "process.env.fullClassName": JSON.stringify(
        "[path][name]__[local]--[hash:base64:5]"
      ), */
    }),
  ],
};
