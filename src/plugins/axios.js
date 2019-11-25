import Vue from "vue";

import axios from "axios";
import { LoadingBar } from "view-design";
axios.defaults.headers.common["AccessToken"] = "rIu4kqfpSiGw3BlVskACTQ";
Vue.prototype.$http = axios;

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    LoadingBar.start();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log(response.data);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    LoadingBar.finish();
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
