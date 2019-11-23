<template>
  <Card dis-hover style="margin:30px;" :padding="30">
    <SearchBox @get-table="getTable" :loading="loading"></SearchBox>
    <Table :border="true" :stripe="true" :loading="loading" :columns="columns1" :data="businessList" disabled-hover>
      <template slot-scope="{row}" slot="time">
        <div class="date">
          {{row.time|date}}
        </div>
      </template>
      <template slot-scope="{index}" slot="action">
        <Button type="primary" icon="ios-link" @click="go(index)">业务详情</Button>
      </template>
    </Table>
    <br>
    <Page :total="page.recordCount" :current="page.pageNumber" :page-size="page.pageSize" :disabled="loading" show-total show-sizer @on-change="updatePageNumber" @on-page-size-change="updatePageSize" />
    <pre>
      <h2>查询/筛选条件</h2>
      <b>{{$store.state.searchCondition}}</b>
    </pre>
  </Card>
</template>
  <script>
import SearchBox from "@/components/SearchBox.vue";
export default {
  components: {
    SearchBox
  },
  data() {
    return {
      loading: false,
      columns1: [],
      businessList: []
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    getTable() {
      this.loading = true;
      setTimeout(() => {
        // this.$Message.success("筛选成功");
        this.businessList = [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park",
            date: "2016-10-03",
            time: 1574517866315
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park",
            date: "2016-10-01",
            time: 1574517866315
          }
        ];
        this.columns1 = [
          {
            title: "序号",
            type: "index",
            width: 120,
            indexMethod: row => {
              return (
                row._index + 1 + (this.page.pageNumber - 1) * this.page.pageSize
              );
            }
          },
          {
            title: "业务名称",
            key: "name",
            ellipsis: true
          },
          {
            title: "年龄",
            key: "age",
            ellipsis: true
          },
          {
            title: "区域",
            key: "address",
            ellipsis: true
          },
          {
            title: "提交时间",
            slot: "time",
            ellipsis: true
          },
          {
            title: "操作",
            slot: "action"
          }
        ];
        this.loading = false;
        this.page.recordCount = 100;
      }, 300);
    },
    updatePageNumber(pageNumber) {
      this.page.pageNumber = pageNumber;
      this.getTable();
    },
    updatePageSize(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNumber === 1) {
        this.getTable();
      }
    },
    go(index) {
      this.$router.push({ path: `/list/${index}` });
    }
  },
  computed: {
    // 从缓存里面取分页数据
    page() {
      return this.$store.state.searchCondition.page;
    }
  }
};
</script>
<style lang="scss">
.date {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>