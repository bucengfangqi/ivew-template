<template>
    <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
      <p slot="title" style="color:green">
        <Icon type="md-image" :size="18"></Icon>
        档案信息
      </p>
      <p>Content of no border type </p>
    </Card>
</template>

<script>
export default {
  name: "FileInfo",
  props: {
    fileInfo: Object // 基本信息
  }
};
</script>

<style lang="scss" scoped>

</style>