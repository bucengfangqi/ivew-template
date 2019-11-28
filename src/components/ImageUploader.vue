<template>
  <div>

    <div class="demo-upload-list" :key="item.filename" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="'/netbus/buss/photo?name='+item.filename">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.filename)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" action="/netbus/buss/localUpfile" :data="fieldInfo" style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片详情" v-model="visible">
      <div style="text-align:center">
        <img :src="'/netbus/buss/photo?name=' + imgName" v-if="visible" style="max-width: 100%;max-height:500px">
      </div>
    </Modal>
    <Modal title="删除图片" v-model="delImage" @on-ok="sureDel(prepareRemoveFile)">
      <p>确认删除此图片？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  props: {
    imagesInfo: Object // 图片列表信息
  },
  data() {
    return {
      defaultList: this.imagesInfo.pictureFiles,
      fieldInfo: {
        field: this.imagesInfo.fieldname,
        busid: this.$route.params.id
      },
      imgName: "",
      visible: false,
      delImage: false,
      uploadList: [],
      prepareRemoveFile: null
    };
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      this.delImage = true;
      this.prepareRemoveFile = file;
    },
    sureDel(file) {
      const fileList = this.$refs.upload.fileList;

      this.$api.deleteFile(file.bussid, file.ftppath, file.id).then(result => {
        if (result.status === "1") {
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          this.$Notice.success({
            title: "已删除"
          });
        } else {
          this.$Notice.error({
            title: result.message?result.message:'删除失败'
          });
        }
      });
    },
    handleSuccess() {
      // 上传成功后，查询后更新图片列表
      this.$Notice.success({
        title: "图片上传成功"
      });
      this.$api.getFilePath(this.$route.params.id).then(pictureFiles => {
        const picutres = [];
        pictureFiles.content.map(picture => {
          if (this.imagesInfo.fieldname === picture.field) {
            picutres.push(picture);
          }
        });
        this.defaultList = picutres;
        setTimeout(() => {
          this.uploadList = this.$refs.upload.fileList;
        }, 10);
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: file.name + " 格式不正确，请选择jpg或者jpeg"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: "文件  " + file.name + " 太大啦, 不能超过 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张图片"
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>

<style lang="scss" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>