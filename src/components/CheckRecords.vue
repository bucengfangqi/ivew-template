<template>
  <div>
    <template v-for="(item, index) in checkRecords">
      <TimelineItem :key="index" color="blue">
        <p class="time">
          <Time :time="getTime(item.CREATETIME)" />
        </p>
        <p class="content">{{"客服-"+item.NAME+"："+item.MESSAGE}}</p>
      </TimelineItem>
    </template>
    <Divider v-if="!checkRecords.length">无审核记录</Divider>
  </div>
</template>

<script>
export default {
  name: "CheckRecords",
  props: {
    checkRecords: Array // 基本信息
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