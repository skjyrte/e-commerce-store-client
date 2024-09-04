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
      "process.env.REQUEST_RETRIES": JSON.stringify(
        process.env.REQUEST_RETRIES
      ),
      "process.env.RETRIES_DELAY": JSON.stringify(process.env.RETRIES_DELAY),
      "process.env.SPINUP_NOTIFY": JSON.stringify(process.env.SPINUP_NOTIFY),
    }),
    new Dotenv({path: "./.env.prod"}),
  ],
};
