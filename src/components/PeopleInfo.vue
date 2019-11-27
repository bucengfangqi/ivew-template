<template>
  <div class="people">
    <div class="idcard">
      <img :src="'/netbus/buss/peoplePhoto?imgName='+people.pictureInfo.name">
    </div>
    <div class="idinfo">
      <div>{{people.name}}</div>
      <div>{{people.idcard}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PeopleInfo",
  props: {
    people: Object // 人口信息
  }
};
</script>

<style lang="scss" scoped>
.people {
  display: flex;
  border: 1px solid #dcdee2;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;

  .idcard {
    height: 50px;
    width: 50px;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  .idinfo {
    > div {
      &:first-child {
        color: #333;
      }
      line-height: 10px;
      margin: 10px 0;
    }
  }
}
</style>