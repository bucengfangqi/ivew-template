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
        pageNumber: 1,
        pageSize: 10,
        recordCount: 0
      }
    },
    businessDetail: {
      formItem: undefined, // 表单列表
      basicInfo: undefined, // 基本信息
      sendMessageModal: false, // 业务留言框
      businessSaveModal: false, // 业务保存框
      businessEnd: false, // 业务人工结束
      businessPass: false, // 业务初审通过
      businessRefuse: false // 业务打回
    }
  },
  mutations: {
    // 更新业务详情用户提交的数据表单
    updateBusinessDetailFormItem(state, formItem) {
      state.businessDetail.formItem = formItem;
    },
    // 更新业务详情基本信息
    updateBusinessDetailBasicInfo(state, basicInfo) {
      state.businessDetail.basicInfo = basicInfo;
    },
    // 更新详情留言框状态
    updateBusinessDetailModal(state, modalName) {
      state.businessDetail[modalName] = true;
    },
    // 更新业务状态
    updateBusinessDetailStatus(state, status) {
      state.businessDetail.basicInfo.busdata[0].status = status;
    }
  },
  actions: {},
  modules: {}
});
