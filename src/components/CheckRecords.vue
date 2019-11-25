<template>
  <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
    <p slot="title" style="color:#8c0776">
      <Icon type="md-done-all" :size="18"></Icon>
      审核记录
    </p>
    <Timeline>
      <TimelineItem>
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">1984年</p>
        <p class="content">发布 Macintosh</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2007年</p>
        <p class="content">发布 iPhone</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2010年</p>
        <p class="content">发布 iPad</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">2011年10月5日</p>
        <p class="content">史蒂夫·乔布斯去世</p>
      </TimelineItem>
    </Timeline>
  </Card>
</template>

<script>
export default {
  name: "CheckRecords",
  props: {
    checkRecords: Object // 基本信息
  }
};
</script>

<style lang="scss" scoped>
</style>