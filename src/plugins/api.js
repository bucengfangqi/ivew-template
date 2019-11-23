import Vue from "vue";
import axios from "axios";
import Qs from "qs";
Vue.prototype.$api = {
  getBussList() {
    return axios.post(
      "/static/json/list.json",
      Qs.stringify({
        bar: 123
      })
    );
  }
};
