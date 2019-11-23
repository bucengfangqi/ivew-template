<template>
  <div>
    详情页
  </div>
</template>
<script>
export default {
  mounted(){
    this.$api.getBussList().then(res=>{
      console.log(res);
    })
    
  }
}
</script>