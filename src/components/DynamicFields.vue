<template>
  <div>
    <!-- 开关 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'SWITCH'">
      <i-switch v-model="formItem[field.fieldname]">
        <Icon type="md-checkmark" slot="open"></Icon>
        <Icon type="md-close" slot="close"></Icon>
      </i-switch>
    </FormItem>
    <!-- 输入框 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'TEXT'&&!field.typearg">
      <Input v-model="formItem[field.fieldname]" :placeholder="field.hint"></Input>
    </FormItem>
    <!-- 文本域 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'TEXT'&&field.typearg">
      <Input v-model="formItem[field.fieldname]" type="textarea" :autosize="{minRows: field.typearg,maxRows: field.typearg}" :placeholder="field.hint"></Input>
    </FormItem>
    <!-- 下拉框 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'SELECT'">
      <Select v-model="formItem[field.fieldname]">
        <template v-for="option in field.options">
          <Option :key="option.itemname+option.itemvalue" :value="option.itemname" v-if="field.typearg===option.classcode">{{option.itemvalue}}</Option>
        </template>
      </Select>
    </FormItem>
    <!-- 日期 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'DATE'">
      <DatePicker type="date" :placeholder="field.hint" v-model="formItem[field.fieldname]"></DatePicker>
    </FormItem>
    <!-- 图片 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'FILE'">
      <ImageUploader :imagesInfo="field"></ImageUploader>
    </FormItem>
    <!-- 身份证 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'IDCARD'">
      <Input v-model="formItem[field.fieldname]" :placeholder="field.hint"></Input>
    </FormItem>
    <!-- 手机号 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'PHONE'">
      <Input v-model="formItem[field.fieldname]" :placeholder="field.hint"></Input>
    </FormItem>
    <!-- 数字框 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'NUMBER'">
      <InputNumber :max="field.endlimit||99999999" :min="field.beginlimit||-99999999" v-model="formItem[field.fieldname]" :placeholder="field.hint"></InputNumber>
    </FormItem>
    <!-- 单选框 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'RADIO'">
      <RadioGroup v-model="formItem[field.fieldname]">
        <template v-for="option in field.options">
          <Radio style="margin-bottom:5px;" :key="option.itemname+option.itemvalue" :label="option.itemname" border v-if="field.typearg===option.classcode">{{option.itemvalue}}</Radio>
        </template>
        
      </RadioGroup>
    </FormItem>
    <!-- 多人口 -->
    <FormItem style="width:100%" :label="field.content" v-if="field.type === 'PEOPLE'">
      <div v-if="field.peopleList.length===0">暂无</div>
      <PeopleInfo :key="people.name+index" v-for="(people,index) in field.peopleList" :people="people"></PeopleInfo>
    </FormItem>
  </div>
</template>

<script>
import PeopleInfo from "@/components/PeopleInfo.vue";
import ImageUploader from "@/components/ImageUploader.vue";

export default {
  name: "DynamicFields",
  components: {
    PeopleInfo,
    ImageUploader
  },
  props: {
    field: Object, // 基本信息
    formItem: Object
  }
};
</script>
