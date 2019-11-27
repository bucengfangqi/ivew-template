<template>
  <div class="people">
    <div class="idcard">
      <img :src="'/netbus/buss/peoplePhoto?imgName='+people.pictureInfo.name">
      <div class="eye" @click="handleView">
        <Icon type="ios-eye-outline" class="eye-icon"></Icon>
      </div>
    </div>
    <div class="idinfo">
      <div>{{people.name}}</div>
      <div>{{people.idcard}}</div>
    </div>

    <Modal title="图片详情" v-model="visible">
      <img :src="'/netbus/buss/peoplePhoto?imgName='+people.pictureInfo.name" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  name: "PeopleInfo",
  props: {
    people: Object // 人口信息
  },
  data() {
    return {
      imgName: "",
      visible: false
    };
  },
  methods: {
    handleView() {
      this.visible = true;
    }
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
    position: relative;

    .eye {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: none;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .eye-icon {
        color: #fff;
        font-size: 20px;
      }
    }

    &:hover .eye {
      display: flex;
    }
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