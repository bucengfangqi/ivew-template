<template>
  <Card dis-hover :bordered="false" style="margin:30px" :padding="10">
    <p slot="title" style="color:#2d8cf0">
      <Icon type="md-list-box" :size="18"></Icon>
      用户提交的数据
    </p>

    <Form v-if="formFields&&formItem" :model="formItem" :label-position="'top'" :inline="true" class="form-info">
      <template v-for="(field,index) in formFields">
        <DynamicFields class="form-item" :key="field.fieldname+index" :formItem="formItem" :field="field"></DynamicFields>
      </template>
    </Form>
    <!-- <pre>
      {{formItem}}
    </pre> -->
  </Card>
</template>

<script>
import DynamicFields from "@/components/DynamicFields.vue";

export default {
  components: {
    DynamicFields
  },
  name: "FormInfo",
  props: {
    forminfo: Object // 基本信息
  },
  data() {
    return {
      formItem: undefined,
      // 表单列表
      formFields: undefined
    };
  },
  mounted() {
    const formItem = {};
    this.forminfo.items.map(field => {
      switch (field.type) {
        case "SWITCH":
          if (this.forminfo.content.busdata[0][field.fieldname] === "true") {
            formItem[field.fieldname] = true;
          } else {
            formItem[field.fieldname] = false;
          }
          break;
        case "NUMBER":
          formItem[field.fieldname] = +this.forminfo.content.busdata[0][
            field.fieldname
          ];
          break;
        default:
          formItem[field.fieldname] = this.forminfo.content.busdata[0][
            field.fieldname
          ];
          break;
      }
    });
    this.formItem = formItem;
    this.formFields = this.forminfo.items;
  }
};
</script>

<style lang="scss" scoped>
.form-info {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;

  .form-item {
    width: 25%;
    min-width: 295px;
    padding: 0 20px;
  }
}
</style>