<template>
  <Modal v-model="businessDetail.businessSaveModal" title="备注" @on-cancel="cancel">
    <Input v-model="message" type="textarea" :rows="8" maxlength="200" show-word-limit placeholder="请输入" />
    <p slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" style="margin-left:8px;" @click="ok" :disabled="!message">提交</Button>
    </p>
  </Modal>
</template>

<script>
export default {
  name: "CheckRecordsSend",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    ok() {
      this.cancel();
    },
    cancel() {
      this.$store.state.businessDetail.businessSaveModal = false;
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
</style>