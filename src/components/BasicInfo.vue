<template>
  <Card dis-hover :bordered="false">
    <p slot="title">
      业务基本信息
    </p>
    <div class="business-info-list">
		<div>
			<span class="business-key">业务分类：</span>
			ZHANG测试
		</div>
		<div>
			<span class="business-key">业务ID：</span>
			<b>3121</b>
		</div>
		<div>
			<span class="business-key">业务状态：</span>
			<Badge status="processing" :text="'客户提交'" />
		</div>
		<div>
			<span class="business-key">营业区域：</span>
			默认
		</div>
		<div>
			<span class="business-key">业务来源：</span>
			杭州自助机
		</div>
		<div style="min-width:300px;">
			<span class="business-key">业务提交时间：</span>
			2019-11-25 14:45:37
		</div>
	</div>
  </Card>
</template>

<script>
export default {
  name: "BasicInfo",
  props: {
    basicInfo: Object // 基本信息
  }
};
</script>

<style lang="scss" scoped>
.business-info-list{
	display: flex;
	flex-wrap: wrap;
	color: #515a6e;
	line-height: 36px;

	>div{
		width: 20%;
		min-width: 200px;

		.business-key{
			color: #17233d;
		}
	}
}
</style>