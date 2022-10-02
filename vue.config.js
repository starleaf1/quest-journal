const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "AmborJo Quest",
    themeColor: "#ffffff",
    manifestOptions: {
      name: 'AmborJo Quest',
      display: 'standalone'
    }
  },
});
