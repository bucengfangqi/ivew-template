<template>
  <div class="business-info-list">
    <div>
      <span class="business-key">业务分类：</span>
      <template v-for="(menu,index) in busMenus">
        <span :key="menu.cmenunameode+index" v-if="menu.id===busdata.menuid">{{menu.menuname}}</span>
      </template>
    </div>
    <div>
      <span class="business-key">业务ID：</span>
      <b>{{busdata.id}}</b>
    </div>
    <div>
      <span class="business-key">业务状态：</span>
      <Badge v-if="busdata.status===6" status="success" :text="statusMap[busdata.status]" />
      <Badge v-else-if="busdata.status===1" status="processing" :text="statusMap[busdata.status]" />
      <Badge v-else-if="busdata.status===2" status="warning" :text="statusMap[busdata.status]" />
      <Badge v-else-if="busdata.status===3" status="error" :text="statusMap[busdata.status]" />
      <Badge v-else status="default" :text="statusMap[busdata.status]" />
    </div>
    <div>
      <span class="business-key">营业区域：</span>
      <template v-for="(area,index) in sysAreas">
        <span :key="area.code+index" v-if="area.code===busdata.area">{{area.name}}</span>
      </template>
    </div>
    <div>
      <span class="business-key">业务来源：</span>
      {{sourcenameMap[busdata.sourcename]}}
    </div>
    <div>
      <span class="business-key">业务提交时间：</span>
      {{busdata.submittime|date}}
    </div>
    <div v-if="busdata.hh">
      <span class="business-key">户号：</span>
      {{busdata.hh}}
    </div>
    <div v-if="busdata.name">
      <span class="business-key">户名：</span>
      {{busdata.name}}
    </div>
    <div v-if="busdata.addr">
      <span class="business-key">地址：</span>
      {{busdata.addr}}
    </div>
  </div>

</template>

<script>
export default {
  name: "BasicInfo",
  props: {
    basicInfo: Object // 基本信息
  },
  data() {
    return {
      busdata: this.basicInfo.busdata[0], // 业务详情
      sourcenameMap: this.basicInfo.sourcenameMap, // 业务通道字典
      statusMap: this.basicInfo.statusMap, // 业务状态字典
      sysAreas: this.basicInfo.sysAreas, // 业务区域列表
      busMenus: this.basicInfo.busMenus // 业务分类列表
    };
  }
};
</script>

<style lang="scss" scoped>
.business-info-list {
  display: flex;
  flex-wrap: wrap;
  color: #515a6e;
  line-height: 36px;

  > div {
    width: 25%;
    min-width: 295px;
    padding: 0 20px;

    .business-key {
      color: #17233d;
    }
  }
}
</style>