import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchCondition: {
      id: null, // 业务ID
      menuid: null, // 业务分类
      status: null, // 单据状态
      area: null, // 业务区域
      date: [null, null], // 业务提交时间
      signedStatus: null, // 合同状态
      sourcename: null, // 业务来源
      // 分页
      page: {
        pageNumber: 2,
        pageSize: 10,
        recordCount:0,
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
