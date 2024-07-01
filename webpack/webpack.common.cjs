const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (fullClassName) => {
  return {
    entry: path.resolve(__dirname, "..", "./src/index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: fullClassName,
                },
              },
            },
            "sass-loader",
          ],
          include: /\.module\.s[ac]ss$/,
        },
        {
          test: /\.(css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: fullClassName,
                },
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.s[ac]ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          exclude: /\.module\.s[ac]ss$/,
        },
        {
          test: /\.(css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "asset/inline",
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "..", "./build"),
      filename: "bundle.js",
      publicPath: "/", //specify the base path for all the assets within application
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "..", "./public/index.html"),
      }),
      new MiniCssExtractPlugin(),
    ],
    stats: "errors-only",
  };
};
