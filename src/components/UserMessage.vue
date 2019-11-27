<template>
  <div>
    <Timeline>
      <template v-for="(item, index) in sessions">
        <TimelineItem :key="index" :color="item.TYPE?'green':'blue'">
          <p class="time">
            <Time :time="getTime(item.CREATETIME)" />
          </p>
          <p class="content">{{(item.TYPE?"用户":"客服")+"-"+item.NAME+"："+item.TEXT}}</p>
        </TimelineItem>
      </template>

    </Timeline>
    <Divider v-if="!sessions.length">无留言信息</Divider>
  </div>
</template>

<script>
export default {
  name: "UserMessage",
  props: {
    userMessage: Object // 基本信息
  },
  data() {
    return {
      sessions: []
    };
  },
  mounted() {
    if (this.userMessage.talkdata) {
      this.sessions = this.userMessage.talkdata.reverse();
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
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>