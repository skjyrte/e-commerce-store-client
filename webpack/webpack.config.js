const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (envVars) => {
  const {env} = envVars;
  const fullClassName = () => {
    if (env === "dev") return "[path][name]__[local]--[hash:base64:5]";
    if (env === "prod") return "[hash:base64]";
    else throw new Error();
  };
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig(fullClassName()), envConfig);
  return config;
};
