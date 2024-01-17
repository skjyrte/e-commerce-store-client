const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      /*       "process.env.fullClassName": JSON.stringify("[hash:base64]"), */
    }),
  ],
};
