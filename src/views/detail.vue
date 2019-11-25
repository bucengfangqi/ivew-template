<template>
  <div>
    <BasicInfo></BasicInfo>
    <FormInfo></FormInfo>
    <FileInfo></FileInfo>
    <UserMessage></UserMessage>
    <CheckRecords></CheckRecords>

    <Card dis-hover :bordered="false" style="margin:30px">
      <Button type="info" style="margin-right:5px">Info</Button>
      <Button type="success" style="margin-right:5px">Success</Button>
      <Button type="warning" style="margin-right:5px">Warning</Button>
      <Button type="primary">操作</Button>
    </Card>
  </div>
</template>
<script>
import BasicInfo from "@/components/BasicInfo.vue";
import FormInfo from "@/components/FormInfo.vue";
import FileInfo from "@/components/FileInfo.vue";
import UserMessage from "@/components/UserMessage.vue";
import CheckRecords from "@/components/CheckRecords.vue";

export default {
  components: {
    BasicInfo,
    FormInfo,
    FileInfo,
    UserMessage,
    CheckRecords
  }
};
</script>