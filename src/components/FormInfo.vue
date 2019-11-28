<template>
  <Form v-if="formFields&&formItem" :model="formItem" :label-position="'top'" :inline="true" class="form-info">
    <template v-for="(field,index) in formFields">
      <DynamicFields class="form-item" :key="field.fieldname+index" :formItem="formItem" :field="field"></DynamicFields>
    </template>
    <!-- <pre>
      {{formItem}}
    </pre> -->
  </Form>
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
    this.$store.commit("updateBusinessDetailFormItem", formItem);
    this.formFields = this.forminfo.items;
  },
  computed: {
    // 从缓存里面取数据
    formItem() {
      return this.$store.state.businessDetail.formItem;
    }
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