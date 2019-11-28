<template>
  <div>
    <Timeline>
      <template v-for="item in userMessage">
        <TimelineItem :key="item.TEXT+item.ID" :color="item.TYPE?'green':'blue'">
          <p class="time">
            <Time :time="getTime(item.CREATETIME)" />
          </p>
          <p class="content">{{(item.TYPE?"用户":"客服")+(item.NAME?("-"+item.NAME):'')+"："+item.TEXT}}</p>
        </TimelineItem>
      </template>

    </Timeline>
    <Divider v-if="!userMessage.length">无留言信息</Divider>
  </div>
</template>

<script>
export default {
  name: "UserMessage",
  props: {
    userMessage: Array // 基本信息
  },
  methods: {
    getTime(time) {
      return new Date(time).getTime();
    }
  }
};
</script>

<style lang="scss" scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>