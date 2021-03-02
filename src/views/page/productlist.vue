<template>
  <div class="product-list">
    <!-- 搜索框区域 -->
    <search-box @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>

    <!-- 表格数据区域 -->
    <products-table
      :data="tableData"
      :page="page"
      @change="changePage"
      @edit="editProduct"
      @delete="deleteProduct"
      :categoryList="categoryList"
    />
  </div>
</template>

<script>
import searchBox from '@/components/productList/searchBox.vue';
import productsTable from '@/components/productList/productsTable.vue';
import api from '@/api/index';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    searchBox,
    productsTable,
  },
  async created() {
    await api.goodsCategory().then((res) => {
      this.categoryList = res.data.data.data;
      res.data.data.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      api
        .getProductsTable({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.data.data.total;
          this.tableData = res.data.data.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    deleteProduct(record) {
      this.$confirm({
        title: '确认删除?',
        content: () => (
          <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>
        ),
        onOk: () => {
          api
            .deleteProduct({
              id: record.id,
            })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
};
</script>

<style lang="less">
.product-list {
  // position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 65px;
    background-color: #008c8c;
  }
}
</style>
