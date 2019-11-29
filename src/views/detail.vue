<template>
  <div>
    <Card dis-hover :bordered="false">
      <p slot="title">
        业务基本信息
      </p>
      <BasicInfo v-if="basicInfo"></BasicInfo>
      <div v-if="!basicInfo" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <Card dis-hover :bordered="false" style="margin:30px" :padding="10">
      <p slot="title" style="color:#2d8cf0">
        <Icon type="md-list-box" :size="18"></Icon>
        用户提交的数据
      </p>
      <FormInfo v-if="forminfo" :forminfo="forminfo"></FormInfo>
      <div v-if="!forminfo" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
      <p slot="title" style="color:green">
        <Icon type="md-image" :size="18"></Icon>
        档案信息
      </p>
      <FileInfo v-if="fileInfo" :fileInfo="fileInfo"></FileInfo>
      <div v-if="!fileInfo" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
      <p slot="title" style="color:#444">
        <Icon type="md-at" :size="18"></Icon>
        业务留言
      </p>
      <UserMessage v-if="userMessage" :userMessage="userMessage"></UserMessage>
      <div v-if="!userMessage" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
      <p slot="title" style="color:#8c0776">
        <Icon type="md-done-all" :size="18"></Icon>
        审核记录
      </p>
      <CheckRecords v-if="CheckRecords" :checkRecords="CheckRecords"></CheckRecords>
      <div v-if="!CheckRecords" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <!-- 控制面板 -->
    <div class="control-panel">
      <Card dis-hover :bordered="false" :padding="10">
        <Button :disabled="loading||status===7||status===4" icon="md-at" class="userMessage" @click="showModal('sendMessageModal')">业务留言</Button>
        <Button :disabled="loading||status===3||status===7||status===4" icon="md-done-all" class="businessSave" @click="showModal('businessSaveModal')">业务保存</Button>
        <Button :disabled="loading||status===7||status===4" icon="md-pricetag" type="error" @click="showModal('businessEnd')">人工结束</Button>
        <Button :disabled="loading||status!==1" icon="md-checkmark-circle" type="success" @click="showModal('businessPass')">初审通过</Button>
        <Button :disabled="loading||status===3||status===7||status===4" icon="md-close-circle" type="warning" @click="showModal('businessRefuse')">业务退回</Button>
      </Card>
    </div>
    <!-- 业务留言框 -->
    <UserMessageSend @updateSessions="updateSessions"></UserMessageSend>
    <!-- 业务保存框 -->
    <CheckRecordsSend @updateSessions="updateSessions" :editDictionaries="editDictionaries"></CheckRecordsSend>
    <!-- 业务人工结束框 -->
    <BusinessEnd @updateSessions="updateSessions" :editDictionaries="editDictionaries"></BusinessEnd>
    <!-- 业务初审通过框 -->
    <BusinessPass @updateSessions="updateSessions" :editDictionaries="editDictionaries"></BusinessPass>
    <!-- 业务打回框 -->
    <BusinessRefuse @updateSessions="updateSessions" :editDictionaries="editDictionaries"></BusinessRefuse>
  </div>
</template>
<script>
import BasicInfo from "@/components/BasicInfo.vue";
import FormInfo from "@/components/FormInfo.vue";
import FileInfo from "@/components/FileInfo.vue";
import UserMessage from "@/components/UserMessage.vue";
import CheckRecords from "@/components/CheckRecords.vue";

import UserMessageSend from "@/components/modals/UserMessageSend.vue";
import CheckRecordsSend from "@/components/modals/CheckRecordsSend.vue";
import BusinessEnd from "@/components/modals/BusinessEnd.vue";
import BusinessPass from "@/components/modals/BusinessPass.vue";
import BusinessRefuse from "@/components/modals/BusinessRefuse.vue";

export default {
  components: {
    BasicInfo, // 基本信息-组件
    FormInfo, // 用户提交的数据-组件
    FileInfo, // 档案信息-组件
    UserMessage, // 用户留言-组件
    CheckRecords, // 审核记录-组件
    UserMessageSend, // 用户留言框-组件
    CheckRecordsSend, // 业务保存框-组件
    BusinessEnd, // 业务人工结束框-组件
    BusinessPass, // 业务初审通过框-组件
    BusinessRefuse // 业务打回框-组件
  },
  data() {
    return {
      forminfo: undefined, // 用户提交的数据
      fileInfo: undefined, // 档案信息
      userMessage: undefined, // 用户留言
      CheckRecords: undefined, // 审核记录
      editDictionaries: [], // 快捷回复字典
      loading: true
    };
  },
  mounted() {
    this.$http
      .all([
        // 获取业务详情信息
        this.$api.getBussList({
          id: this.$route.params.id,
          status: this.$route.query.status,
          date: ["", ""],
          page: {
            pageNumber: 1,
            pageSize: 10,
            recordCount: 0
          }
        }),
        // 获取模板信息
        this.$api.getBussOptions(this.$route.query.templateid),
        // 获取字典
        this.$api.getDictionaries(["SOURCE_NAME", "BUS_STATUS", "EDITDIC"]),
        // 获取会话信息
        this.$api.getSessions(this.$route.params.id)
      ])
      .then(
        this.$http.spread(
          (businessList, bussOptions, dictionaries, sessions) => {
            /********************************* 基本信息逻辑 ***********************************/
            if (businessList.content && bussOptions.items) {
              this.loading = false;

              businessList.content.sourcenameMap = { null: "-" };
              businessList.content.statusMap = {};
              dictionaries.items.map(item => {
                // 给来源、业务状态字典装载数据（键值对）
                if (item.classcode === "SOURCE_NAME") {
                  businessList.content.sourcenameMap[item.itemname] =
                    item.itemvalue;
                } else if (item.classcode === "BUS_STATUS") {
                  businessList.content.statusMap[item.itemname] =
                    item.itemvalue;
                } else if (item.classcode === "EDITDIC") {
                  this.editDictionaries.push(item);
                }
              });
              this.$store.commit(
                "updateBusinessDetailBasicInfo",
                businessList.content
              );

              /********************************* 档案信息逻辑 ***********************************/
              this.fileInfo = {
                custid: +businessList.content.busdata[0].userid,
                hh: +businessList.content.busdata[0].hh
              };
              /********************************* 会话逻辑 ***********************************/
              this.userMessage = sessions.content.talkdata
                ? sessions.content.talkdata.reverse()
                : [];
              this.CheckRecords = sessions.content.messageData
                ? sessions.content.messageData.reverse()
                : [];
              /********************************* 表单逻辑 ***********************************/
              // 并发数组默认为空
              const spreadHttps = [];
              // 新建 Set
              const dictNameList = new Set();
              // 默认没有多人口字段
              let hasPeople = false;
              // 默认没有图片文件
              let hasPictureFile = false;
              // 遍历表单配置
              bussOptions.items.map(option => {
                if (option.type === "SELECT" || option.type === "RADIO") {
                  dictNameList.add(option.typearg);
                } else if (option.type === "PEOPLE") {
                  hasPeople = true;
                } else if (option.type === "FILE") {
                  hasPictureFile = true;
                }
              });
              // 拼接并发请求
              if ([...dictNameList].length) {
                spreadHttps.push(this.$api.getDictionaries([...dictNameList]));
              } else {
                spreadHttps.push(null);
              }
              if (hasPeople) {
                spreadHttps.push(this.$api.bussGet(this.$route.params.id));
              } else {
                spreadHttps.push(null);
              }
              if (hasPictureFile) {
                spreadHttps.push(this.$api.getFilePath(this.$route.params.id));
              } else {
                spreadHttps.push(null);
              }
              // 如果并发数组不为空，表单配置需要获取字典,或者获取多人口信息
              if (spreadHttps.length) {
                this.$http.all(spreadHttps).then(
                  this.$http.spread(
                    (dictionaries, peopleList, pictureFiles) => {
                      // 如果发起了字典查询，只要后台不报错，一定要查字典
                      if (dictionaries) {
                        bussOptions.items.map(option => {
                          if (
                            option.type === "SELECT" ||
                            option.type === "RADIO"
                          ) {
                            option.options = dictionaries.items;
                          }
                        });
                      }
                      // 如果发起了多人口信息查询，只要后台不报错，一定要查多人口信息
                      if (peopleList) {
                        bussOptions.items.map(option => {
                          if (option.type === "PEOPLE") {
                            // 格式化人口列表
                            peopleList.mapItems.people.map(people => {
                              people.pictureInfo = peopleList.mapItems.peoplepic.find(
                                picture => {
                                  // 对比两个列表，如果图片的peopleid和peope的id相等
                                  return picture.peopleid === people.id;
                                }
                              );
                            });
                            option.peopleList = peopleList.mapItems.people;
                          }
                        });
                      }
                      // 如果发起了图片信息查询，只要后台不报错，一定要查图片信息
                      if (pictureFiles) {
                        bussOptions.items.map(option => {
                          if (option.type === "FILE") {
                            option.pictureFiles = [];
                            pictureFiles.content.map(picture => {
                              if (picture.field === option.fieldname) {
                                option.pictureFiles.push(picture);
                              }
                            });
                          }
                        });
                      }
                      // 最后给动态表单赋值
                      this.forminfo = {
                        content: businessList.content,
                        items: bussOptions.items
                      };
                    }
                  )
                );
              } else {
                // 直接给动态表单赋值
                this.forminfo = {
                  content: businessList.content,
                  items: bussOptions.items
                };
              }
            }
          }
        )
      );
  },
  methods: {
    // 打开留言框
    showModal(objName) {
      this.$store.commit("updateBusinessDetailModal", objName);
    },
    // 更新缓存
    updateSessions() {
      this.$api.getSessions(this.$route.params.id).then(sessions => {
        this.userMessage = sessions.content.talkdata
          ? sessions.content.talkdata.reverse()
          : [];
        this.CheckRecords = sessions.content.messageData
          ? sessions.content.messageData.reverse()
          : [];
      });
    }
  },
  computed: {
    // 从缓存里面取数据
    basicInfo() {
      return this.$store.state.businessDetail.basicInfo;
    },
    // 业务状态
    status() {
      return this.basicInfo.busdata[0].status;
    }
  }
};
</script>
<style lang="scss">
.control-panel {
  position: sticky;
  z-index: 8;
  bottom: 0;
  text-align: right;
  box-shadow: 0px -3px 6px 0 rgba(0, 0, 0, 0.1);

  button {
    margin: 5px;

    i {
      font-size: 16px;
    }
  }
  .userMessage {
    background: #444;
    color: #fff;
    border-color: #444;

    &:focus {
      box-shadow: 0 0 0 2px rgba(#444, 0.2);
    }
  }
  .businessSave {
    background: #8c0776;
    color: #fff;
    border-color: #8c0776;

    &:focus {
      box-shadow: 0 0 0 2px rgba(#8c0776, 0.2);
    }
  }
  .userMessage[disabled],
  .businessSave[disabled] {
    color: #c5c8ce;
    background-color: #f7f7f7;
    border-color: #dcdee2;
  }
}
.spin-container {
  height: 100px;
  position: relative;
}
</style>