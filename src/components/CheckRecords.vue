<template>
  <div>
    <template v-for="(item, index) in messageData">
      <TimelineItem :key="index" color="blue">
        <p class="time">
          <Time :time="getTime(item.CREATETIME)" />
        </p>
        <p class="content">{{"客服-"+item.NAME+"："+item.MESSAGE}}</p>
      </TimelineItem>
    </template>
    <Divider v-if="!messageData.length">无审核记录</Divider>
  </div>
</template>

<script>
export default {
  name: "CheckRecords",
  props: {
    checkRecords: Object // 基本信息
  },
  data() {
    return {
      messageData: []
    };
  },
  mounted() {
    if (this.checkRecords.messageData) {
      this.messageData = this.checkRecords.messageData.reverse();
    }
  },
  methods: {
    getTime(time) {
      return new Date(time).getTime();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>