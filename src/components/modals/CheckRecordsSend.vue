<template>
  <Modal v-model="businessDetail.businessSaveModal" @on-cancel="cancel">
    <p slot="header" style="color:#8c0776;">
      <Icon type="md-done-all" :size="18"></Icon>
      业务保存备注
    </p>
    <Input v-model="message" type="textarea" :rows="8" maxlength="200" show-word-limit placeholder="请输入" />
    <div class="quick-buttons">
      <Button size="small" :key="item.itemvalue+item.id" v-for="item in editDictionaries" style="margin:5px;font-size:12px;" @click="message=item.itemvalue">
        {{item.itemvalue}}
      </Button>
    </div>
    <p slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" style="margin-left:8px;" @click="ok" :disabled="!message">提交</Button>
    </p>
  </Modal>
</template>

<script>
export default {
  name: "CheckRecordsSend",
  props: {
    editDictionaries: Array // 快捷回复列表信息
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    ok() {
      this.$http
        .all([
          // 业务保存
          this.$api.bussSave(this.businessDetail.formItem),
          // 发短信
          this.$api.sendMessage(
            this.$route.params.id,
            "[业务保存]" + this.message,
            1 // 业务保存短信模板ID为 1
          )
        ])
        .then(
          this.$http.spread(() => {
            this.$Notice.success({
              title: "业务保存成功！"
            });
            this.$emit("updateSessions");
            this.cancel();
          })
        );
    },
    cancel() {
      this.businessDetail.businessSaveModal = false;
      this.message = "";
    }
  },
  computed: {
    // 从缓存里面取数据
    businessDetail() {
      return this.$store.state.businessDetail;
    }
  }
};
</script>

<style lang="scss" scoped>
.quick-buttons {
  padding-top: 16px;
}
</style>