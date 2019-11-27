<template>
  <div>
    <BasicInfo></BasicInfo>
    <FormInfo v-if="forminfo" :forminfo="forminfo"></FormInfo>
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
          page: this.page
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
            // 遍历表单配置
            bussOptions.items.map(option => {
              if (option.type === "SELECT" || option.type === "RADIO") {
                dictNameList.add(option.typearg);
              } else if (option.type === "PEOPLE") {
                hasPeople = true;
              }
            });
            if ([...dictNameList].length) {
              spreadHttps.push(this.$api.getDictionaries([...dictNameList]));
            }
            if (hasPeople) {
              spreadHttps.push(this.$api.bussGet(this.$route.params.id));
            }
            // 如果并发数组不为空，表单配置需要获取字典,或者获取多人口信息
            if (spreadHttps.length) {
              this.$http.all(spreadHttps).then(
                // 此处不确定【第一个值】是哪个请求的结果
                this.$http.spread((resultOne, resultTwo) => {
                  bussOptions.items.map(option => {
                    if (option.type === "SELECT" || option.type === "RADIO") {
                      option.options = resultOne.items;
                    } else if (option.type === "PEOPLE") {
                      // 格式化人口列表
                      let peopleList = [];
                      if ([...dictNameList].length && hasPeople) {
                        peopleList = resultTwo.mapItems.people;
                      } else {
                        peopleList = resultOne.mapItems.people;
                      }
                      peopleList.map(people => {
                        people.pictureInfo = resultOne.mapItems.peoplepic.find(
                          picture => {
                            return picture.peopleid === people.id;
                          }
                        );
                      });
                      option.peopleList=peopleList;
                    }
                  });
                  // 再给动态表单赋值
                  this.forminfo = {
                    content: businessList.content,
                    items: bussOptions.items
                  };
                })
              );
            } else {
              // 直接给动态表单赋值
              this.forminfo = {
                content: businessList.content,
                items: bussOptions.items
              };
            }
          }
        })
      );
  },
  computed: {
    // 从缓存里面取分页数据
    page() {
      return this.$store.state.searchCondition.page;
    }
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
</style>