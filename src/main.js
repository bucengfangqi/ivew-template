import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./plugins/axios";
import "./plugins/iview";
import "./plugins/api";
import "./plugins/filter";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
