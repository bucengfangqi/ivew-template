<template>
  <div>
    <Card dis-hover :bordered="false">
      <p slot="title">
        业务基本信息
      </p>
      <BasicInfo v-if="basicInfo" :basicInfo="basicInfo"></BasicInfo>
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
        用户留言
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
      <CheckRecords v-if="userMessage" :checkRecords="userMessage"></CheckRecords>
      <div v-if="!userMessage" class="spin-container">
        <Spin size="large" fix></Spin>
      </div>
    </Card>

    <!-- 控制面板 -->
    <div class="control-panel">
      <Card dis-hover :bordered="false">
        <Button type="info" style="margin-right:5px">Info</Button>
        <Button type="success" style="margin-right:5px">Success</Button>
        <Button type="warning" style="margin-right:5px">Warning</Button>
        <Button type="primary">操作</Button>
      </Card>
    </div>
  </div>
</template>
<script>
import BasicInfo from "@/components/BasicInfo.vue";
import FormInfo from "@/components/FormInfo.vue";
import FileInfo from "@/components/FileInfo.vue";
import UserMessage from "@/components/UserMessage.vue";
import CheckRecords from "@/components/CheckRecords.vue";

export default {
  components: {
    BasicInfo,
    FormInfo,
    FileInfo,
    UserMessage,
    CheckRecords
  },
  data() {
    return {
      forminfo: undefined,
      basicInfo: undefined,
      fileInfo: undefined,
      userMessage: undefined
    };
  },
  mounted() {
    this.$http
      .all([
        // 获取业务详情信息
        this.$api.getBussList({
          id: this.$route.params.id,
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
        this.$api.getDictionaries(["SOURCE_NAME", "BUS_STATUS"]),
        // 获取会话信息
        this.$api.getSessions(this.$route.params.id)
      ])
      .then(
        this.$http.spread(
          (businessList, bussOptions, dictionaries, sessions) => {
            /********************************* 基本信息逻辑 ***********************************/
            if (businessList.content) {
              businessList.content.sourcenameMap = { null: "-" };
              businessList.content.statusMap = {};
              dictionaries.items.map(item => {
                // 给来源、业务状态字典装载数据（键值对）
                if (item.classcode === "SOURCE_NAME") {
                  businessList.content.sourcenameMap[item.itemname] =
                    item.itemvalue;
                } else {
                  businessList.content.statusMap[item.itemname] =
                    item.itemvalue;
                }
              });
              this.basicInfo = businessList.content;

              /********************************* 档案信息逻辑 ***********************************/
              this.fileInfo = {
                custid: +businessList.content.busdata[0].userid,
                hh: +businessList.content.busdata[0].hh
              };
              /********************************* 会话逻辑 ***********************************/
              this.userMessage = sessions.content;
            }
            /********************************* 表单逻辑 ***********************************/
            if (bussOptions.items) {
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
}
.spin-container {
  height: 100px;
  position: relative;
}
</style>