import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { createPinia, PiniaVuePlugin, setActivePinia } from "pinia";
import { Plugin } from "vue-fragment";
import VueCompositionAPI from "@vue/composition-api";
import "./registerServiceWorker";
import FirebaseVuePlugin from "@/plugins/firebase";
import { LMap, LTileLayer, LMarker, LLayerGroup, LControl } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const pinia = createPinia();
setActivePinia(pinia);
Vue.use(PiniaVuePlugin);
Vue.use(VueCompositionAPI);
Vue.use(Plugin);
Vue.use(FirebaseVuePlugin);
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-layer-group", LLayerGroup);
Vue.component("l-marker", LMarker);
Vue.component("l-control", LControl);

Vue.config.productionTip = false;

Vue.mixin({
  computed: {
    isOnPC() {
      return !this.$vuetify.breakpoint.mobile;
    },
  },
});

new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
