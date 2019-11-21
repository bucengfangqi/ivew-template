import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "view-design/dist/styles/iview.css";
import { Button, Table} from "view-design";
Vue.component("Button", Button);
Vue.component("Table", Table);
import "./plugins/axios";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
