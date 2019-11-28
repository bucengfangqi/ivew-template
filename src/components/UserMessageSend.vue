<template>
  <Modal v-model="businessDetail.sendMessageModal" title="业务留言" @on-cancel="cancel">
    <Input v-model="message" type="textarea" :rows="8" maxlength="200" show-word-limit placeholder="请输入" />
    <p slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" style="margin-left:8px;" @click="ok" :disabled="!message">确认留言</Button>
    </p>
  </Modal>
</template>

<script>
export default {
  name: "UserMessageSend",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    ok() {
      this.$api.bussReply(this.$route.params.id, this.message, 0).then(() => {
        this.$Notice.success({
          title: "业务留言成功！"
        });
        this.$emit('updateSessions');
        this.cancel();
      });
    },
    cancel() {
      this.$store.state.businessDetail.sendMessageModal = false;
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