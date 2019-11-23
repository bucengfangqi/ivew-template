import Vue from "vue";
import axios from "axios";

Vue.prototype.$api = {
  getBussList() {
    return axios.get("/static/json/list.json", {
      params: {
        firstName: "Fred",
        lastName: "Flintstone"
      },
      paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      }
    });
  }
};
