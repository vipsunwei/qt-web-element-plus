const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? "./" : "/",
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
  // devServer: {
  //   before: require("./mock/index.js"),
  // },
};
