import Vue from "vue";
import axios from "axios";
// import Qs from "qs";
Vue.prototype.$api = {
  // 查询业务列表
  getBussList(searchCondition) {
    // return axios.post("/netbus/buss/list", Qs.stringify(searchCondition));
    return axios.post("/netbus/buss/list", {
      busData: {
        id: searchCondition.id ? searchCondition.id : undefined, // 业务ID
        menuid: searchCondition.menuid ? searchCondition.menuid : undefined, // 业务分类
        status: searchCondition.status ? searchCondition.status : undefined, // 单据状态
        area: searchCondition.area ? searchCondition.area : undefined, // 业务区域
        sourcename: searchCondition.sourcename
          ? searchCondition.sourcename
          : undefined // 业务来源
      },
      beginDate: searchCondition.date[0] ? searchCondition.date[0] : undefined, // 业务提交时间 (开始)
      endDate: searchCondition.date[1] ? searchCondition.date[1] : undefined, // 业务提交时间 (结束)
      signedStatus: searchCondition.signedStatus
        ? searchCondition.signedStatus
        : undefined, // 合同状态
      page: searchCondition.page
    });
  },
  // 查询字典
  getDictionaries(dictNameList) {
    return axios.post("/netbus/tpl/getdict", {
      classcodes: dictNameList
    });
  }
};
