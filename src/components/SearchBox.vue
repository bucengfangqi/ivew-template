<template>
  <Form ref="searchCondition" :model="searchCondition" :label-position="'top'" :inline="true" :disabled="loading">
    <FormItem label="业务ID" prop="id">
      <InputNumber style="width: 90px" :max="9999999" :min="1" v-model="searchCondition.id" placeholder="例：001" @on-change="getTable"></InputNumber>
    </FormItem>
    <FormItem label="业务分类" prop="menuid">
      <Select v-model="searchCondition.menuid" :clearable="true" @on-change="getTable">
        <Option value="1">啦啦啦</Option>
        <Option value="2">London</Option>
        <Option value="3">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="单据状态" prop="status">
      <Select v-model="searchCondition.status" :clearable="true" @on-change="getTable">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务区域" prop="area">
      <Select v-model="searchCondition.area" :clearable="true" @on-change="getTable">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务提交时间" prop="date">
      <DatePicker v-model="searchCondition.date" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="getTable"></DatePicker>
    </FormItem>
    <FormItem label="合同状态" prop="signedStatus">
      <Select v-model="searchCondition.signedStatus" :clearable="true" @on-change="getTable">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="业务来源" prop="sourcename">
      <Select v-model="searchCondition.sourcename" :clearable="true" @on-change="getTable">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="操作">
      <Button type="primary" @click="handleReset">清空查询条件</Button>
    </FormItem>
  </Form>
</template>
<script>
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
export default {
  name: "SearchBox",
  props: {
    loading: Boolean
  },
  data() {
    return {
      formChange: new Subject()
    };
  },
  mounted() {
    this.formChange.pipe(debounceTime(500)).subscribe(() => {
      this.$emit("get-table");
    });
  },
  beforeDestroy() {
    this.formChange.unsubscribe();
  },
  methods: {
    // 表单变更
    getTable(value) {
      this.formChange.next(value);
    },
    // 重置表单
    handleReset() {
      // 由于表单存在缓存，无法使用 iview 所提供的的初始化方法
      this.$store.state.searchCondition = {
        id: null,
        date: ["", ""],
        page: {
          pageNumber: 1,
          pageSize: this.searchCondition.page.pageSize,
          recordCount: this.searchCondition.page.recordCount
        }
      };
      this.getTable();
    }
  },
  computed: {
    // 从缓存里面取表单数据
    searchCondition() {
      return this.$store.state.searchCondition;
    }
  }
};
</script>