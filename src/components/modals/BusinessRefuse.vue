<template>
  <Modal v-model="businessDetail.businessRefuse" @on-cancel="cancel">
    <p slot="header" style="color:#f90;">
      <Icon type="md-close-circle" :size="18"></Icon>
      业务退回备注
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
  name: "BusinessRefuse",
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
          // 业务退回
          this.$api.updateStatus(this.$route.params.id,3),
          // 发短信
          this.$api.sendMessage(
            this.$route.params.id,
            "[业务退回]" + this.message,
            3 // 业务退回短信模板ID为 3
          )
        ])
        .then(
          this.$http.spread(() => {
            this.$Notice.success({
              title: "业务退回成功！"
            });
            this.$emit("updateSessions");
            this.cancel();
            // 更新业务状态
            this.$store.commit("updateBusinessDetailStatus", 3);
          })
        );
    },
    cancel() {
      this.businessDetail.businessRefuse = false;
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