const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Quest Journal",
    themeColor: "#ffffff",
  },
});
