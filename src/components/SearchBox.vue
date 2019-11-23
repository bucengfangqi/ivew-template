<template>
  <Form :model="searchCondition" :label-position="'top'" :inline="true">
    <FormItem label="业务分类">
      <Select v-model="searchCondition.select">
        <Option value="beijing">New York 哎哎哎 哎哎哎 哎哎哎 哎哎哎</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="单据状态">
      <Select v-model="searchCondition.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务区域">
      <Select v-model="searchCondition.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务ID">
      <InputNumber style="width: 90px" :max="9999999" :min="1" v-model="searchCondition.id" placeholder="例：001"></InputNumber>
    </FormItem>
    <FormItem label="业务提交时间">
      <DatePicker v-model="searchCondition.date" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
    </FormItem>
    <FormItem label="合同状态">
      <Select v-model="searchCondition.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务来源">
      <Select v-model="searchCondition.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "SearchBox",
  data() {
    return {
      searchCondition: {
        id: null,
        date: "",
        select: ""
      }
    };
  }
};
</script>