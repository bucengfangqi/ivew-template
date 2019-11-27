<template>
  <div>
    <pre>
		{{imagesInfo}}
	</pre>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  props: {
    imagesInfo: Object // 图片列表信息
  }
};
</script>

<style lang="scss" scoped>
</style>