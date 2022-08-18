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
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();
setActivePinia(pinia);
pinia.use(piniaPluginPersistedState);
Vue.use(PiniaVuePlugin);
Vue.use(VueCompositionAPI);
Vue.use(Plugin);
Vue.use(FirebaseVuePlugin);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
