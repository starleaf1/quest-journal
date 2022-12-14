import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import id from "vuetify/lib/locale/id";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.blue.darken4,
        secondary: "#424242",
        accent: colors.green,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    locales: { id },
    current: "id",
  },
});
