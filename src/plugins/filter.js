import Vue from "vue";
import moment from "moment";
Vue.filter("date", function(value) {
  if (!value) return "";
  value = moment(value).format("YYYY-MM-DD HH:mm:ss");
  return value;
});
