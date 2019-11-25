<template>
  <Card dis-hover :bordered="false" style="margin:30px" :padding="30">
    <p slot="title" style="color:#2d8cf0">
      <Icon type="md-list-box" :size="18"></Icon>
      用户提交的数据
    </p>

    <Form :model="formItem" :label-position="'top'" :inline="true" class="form-info">
      <FormItem class="form-item" label="Input">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem class="form-item" label="Select">
        <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
      </FormItem>
      <FormItem class="form-item" label="DatePicker">
       <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
      </FormItem>
      <FormItem class="form-item" label="Radio">
        <RadioGroup v-model="formItem.radio">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem class="form-item" label="Checkbox">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem class="form-item" label="Switch">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem class="form-item" label="Text">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>

      <FormItem class="form-item" label="Input">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem class="form-item" label="Select">
        <Select v-model="formItem.select">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem class="form-item" label="DatePicker">
        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
      </FormItem>
      <FormItem class="form-item" label="Radio">
        <RadioGroup v-model="formItem.radio">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem class="form-item" label="Switch">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem class="form-item" label="Text">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>

  </Card>
</template>

<script>
export default {
  name: "FormInfo",
  props: {
    forminfo: Object // 基本信息
  },
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        textarea: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.form-info{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  .form-item{
    width: 30%;
		min-width: 255px;
  }
}
</style>