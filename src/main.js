import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'
import './registerServiceWorker'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
