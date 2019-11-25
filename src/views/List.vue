<template>
  <Card dis-hover :bordered="false" style="margin:30px;" :padding="30">
    <SearchBox @get-table="getTable" :loading="loading" :dictionaries="dictionaries" :sysAreas="sysAreas" :busMenus="busMenus"></SearchBox>
    <Table :border="true" :stripe="true" :loading="loading" :columns="columns1" :data="businessList" disabled-hover>
      <!-- 业务名称 -->
      <template slot-scope="{ row }" slot="menuid">
        {{businessNameMap[row.menuid]}}
      </template>
      <!-- 营业区域 -->
      <template slot-scope="{ row }" slot="area">
        {{areaMap[row.area]}}
      </template>
      <!-- 来源 -->
      <template slot-scope="{ row }" slot="sourcename">
        {{sourcenameMap[row.sourcename]}}
      </template>
      <!-- 业务状态 -->
      <template slot-scope="{ row }" slot="status">
        <Badge v-if="row.status===6" status="success" :text="statusMap[row.status]" />
        <Badge v-else-if="row.status===1" status="processing" :text="statusMap[row.status]" />
        <Badge v-else-if="row.status===2" status="warning" :text="statusMap[row.status]" />
        <Badge v-else-if="row.status===3" status="error" :text="statusMap[row.status]" />
        <Badge v-else status="default" :text="statusMap[row.status]" />
      </template>
      <!-- 提交时间 -->
      <template slot-scope="{ row }" slot="submittime">
        {{row.submittime|date}}
      </template>
      <!-- 操作 -->
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" icon="ios-link" @click="go(row.id)">业务详情</Button>
      </template>
    </Table>
    <br>
    <!-- 分页 -->
    <Page :total="page.recordCount" :current="page.pageNumber" :page-size="page.pageSize" :disabled="loading" show-total show-sizer @on-change="updatePageNumber" @on-page-size-change="updatePageSize" />
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
      loading: false, // 加载状态
      columns1: [], // 业务列
      businessList: [], // 业务列表
      businessNameMap: {}, // 业务名称字典
      areaMap: {}, // 营业区域字典
      sourcenameMap: {
        null: "-"
      }, // 来源字典
      statusMap: {}, // 业务状态字典
      dictionaries: [], // 来源&业务状态，字典
      sysAreas: [], // 业务区域列表
      busMenus: [] // 业务分类列表
    };
  },
  mounted() {
    // 初始化，获取列表，字典
    this.loading = true;
    this.$http
      .all([
        this.$api.getBussList(this.$store.state.searchCondition),
        this.$api.getDictionaries(["SOURCE_NAME", "BUS_STATUS"])
      ])
      .then(
        this.$http.spread((businessList, dictionaries) => {
          if (businessList.content) {
            this.reanderTable(businessList);
          }
          if (dictionaries.items) {
            this.dictionaries = dictionaries.items;
            dictionaries.items.map(item => {
              // 给来源、业务状态字典装载数据（键值对）
              if (item.classcode === "SOURCE_NAME") {
                this.sourcenameMap[item.itemname] = item.itemvalue;
              } else {
                this.statusMap[item.itemname] = item.itemvalue;
              }
            });
          }
        })
      );
  },
  methods: {
    // 请求数据
    getTable() {
      this.loading = true;
      this.$api
        .getBussList(this.$store.state.searchCondition)
        .then(response => {
          this.reanderTable(response);
        });
    },
    // 渲染表格
    reanderTable(response) {
      // this.$Message.success("筛选成功");
      if (response.content.busdata) {
        this.businessList = response.content.busdata;
      } else {
        this.businessList = [];
      }
      // 给字典装载数据（键值对）
      if (response.content.busMenus) {
        this.busMenus = response.content.busMenus;
        response.content.busMenus.map(busMenu => {
          this.businessNameMap[busMenu.id] = busMenu.menuname;
        });
      }
      // 给营业区域装载数据（键值对）
      if (response.content.sysAreas) {
        this.sysAreas = response.content.sysAreas;
        response.content.sysAreas.map(sysArea => {
          this.areaMap[sysArea.code] = sysArea.name;
        });
      }
      this.columns1 = [
        {
          title: "序号",
          type: "index",
          minWidth: 80,
          indexMethod: row => {
            return (
              row._index + 1 + (this.page.pageNumber - 1) * this.page.pageSize
            );
          }
        },
        {
          title: "业务ID",
          key: "id",
          minWidth: 80,
          ellipsis: true
        },
        {
          title: "业务分类",
          slot: "menuid",
          minWidth: 150
        },
        {
          title: "业务状态",
          slot: "status",
          minWidth: 110
        },
        {
          title: "营业区域",
          slot: "area",
          minWidth: 95
        },
        {
          title: "业务提交时间",
          slot: "submittime",
          minWidth: 170
        },
        {
          title: "业务来源",
          slot: "sourcename",
          minWidth: 120
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 145
        }
      ];
      this.loading = false;
      this.page.recordCount = response.page.recordCount;
    },
    // 更新当前页码
    updatePageNumber(pageNumber) {
      this.page.pageNumber = pageNumber;
      this.getTable();
    },
    // 更新单页数据大小
    updatePageSize(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNumber === 1) {
        this.getTable();
      }
    },
    // 跳转
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