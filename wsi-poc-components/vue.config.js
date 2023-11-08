const { defineConfig } = require("@vue/cli-service");
const federationConfig = require("./federationConfig.json");

module.exports = defineConfig({
  publicPath: "https://wsi-poc-components-amlakhani.surge.sh/",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          ...federationConfig,
          shared: {
            vue: {
              eager: true,
              singleton: false,
            },
          },
          filename: "remoteEntry.js"
        },
      ]);
  },
});
