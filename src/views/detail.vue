<template>
  <div>
    <BasicInfo></BasicInfo>

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

    <FileInfo></FileInfo>
    <UserMessage></UserMessage>
    <CheckRecords></CheckRecords>
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
      forminfo: undefined
    };
  },
  mounted() {
    this.$http
      .all([
        this.$api.getBussList({
          id: this.$route.params.id,
          date: ["", ""],
          page: {
            pageNumber: 1,
            pageSize: 10,
            recordCount: 0
          }
        }),
        this.$api.getBussOptions(this.$route.query.templateid)
      ])
      .then(
        this.$http.spread((businessList, bussOptions) => {
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
                this.$http.spread((dictionaries, peopleList, pictureFiles) => {
                  // 如果发起了字典查询，只要后台不报错，一定要查字典
                  if (dictionaries) {
                    bussOptions.items.map(option => {
                      if (option.type === "SELECT" || option.type === "RADIO") {
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
                  setTimeout(() => {
                    this.forminfo = {
                      content: businessList.content,
                      items: bussOptions.items
                    };
                  }, 1000);
                })
              );
            } else {
              // 直接给动态表单赋值
              setTimeout(() => {
                this.forminfo = {
                  content: businessList.content,
                  items: bussOptions.items
                };
              }, 1000);
            }
          }
        })
      );
  }
};
</script>
<style lang="scss">
.control-panel {
  position: sticky;
  z-index: 1;
  bottom: 0;
  text-align: right;
  box-shadow: 0px -3px 6px 0 rgba(0, 0, 0, 0.1);
}
.spin-container {
  height: 100px;
  position: relative;
}
</style>