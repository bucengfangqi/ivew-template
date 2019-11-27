<template>
  <div>
    <Table disabled-hover :columns="columns1" :data="data1"></Table>
    <Divider v-if="noMisinfo">无档案信息</Divider>
  </div>
</template>

<script>
export default {
  name: "FileInfo",
  props: {
    fileInfo: Object // 基本信息
  },
  data() {
    return {
      noMisinfo: false,
      loading: false,
      columns1: [],
      data1: [{}]
    };
  },
  mounted() {
    if (this.fileInfo.hh) {
      this.loading = true;
      this.$api.getMisInfo(this.fileInfo).then(misinfo => {
        this.loading = false;
        const optioninfo = JSON.parse(misinfo.content.optioninfo)[0].body;
        const hhInfo = misinfo.mapItems.WDDA[0];
        optioninfo.map(option => {
          this.columns1.push({
            title: option.title,
            key: option.value,
            minWidth: 140
          });
          this.data1[0][option.value] = hhInfo[option.value];
        });
        console.log(optioninfo, hhInfo);
      });
    } else {
      this.noMisinfo = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>