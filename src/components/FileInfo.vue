<template>
  <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
    <p slot="title" style="color:green">
      <Icon type="md-image" :size="18"></Icon>
      档案信息
    </p>
    <Table disabled-hover :columns="columns1" :data="data1"></Table>
  </Card>
</template>

<script>
export default {
  name: "FileInfo",
  props: {
    fileInfo: Object // 基本信息
  },
  data() {
    return {
      columns1: [
        {
          title: "户号",
          key: "number"
        },
        {
          title: "户名",
          key: "name"
        },
        {
          title: "用水地址",
          key: "address"
        },
        {
          title: "表身号",
          key: "billInfo"
        },
        {
          title: "抄表周期",
          key: "period"
        },
        {
          title: "用水人口",
          key: "people"
        }
      ],
      data1: [
        {
          number: "1234567",
          name: '*双英',
          address: "*墩路49号4楼",
          billInfo: "	F14-20-21983",
          period:"季度抄",
          people:"0"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>