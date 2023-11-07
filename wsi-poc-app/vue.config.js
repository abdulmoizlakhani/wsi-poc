const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "http://localhost:8080/",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          remotes: {
            "wsi-poc-components":
              "wsi_poc_components@http://localhost:8081/remoteEntry.js",
          },
          shared: {
            vue: {
              eager: true,
              singleton: false,
            },
          },
        },
      ]);
  },
});
