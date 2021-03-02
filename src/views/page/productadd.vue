<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 内容区,表单区域 -->
      <basic-detail v-if="current === 0" @next="next" :form="form" />
      <sale-detail
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import basicDetail from '@/components/productAdd/basicDetail.vue';
import saleDetail from '@/components/productAdd/saleDetail.vue';
import api from '@/api/index';

export default {
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    basicDetail,
    saleDetail,
  },
  created() {
    const { id } = this.$route.params;
    console.log(id);
    if (id) {
      api.productDetail(id).then((res) => {
        this.form = res.data.data;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 函数起提交数据的作用
        if (this.$route.params.id) {
          api.editProduct(this.form).then(() => {
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.addProduct(this.form).then(() => {
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>

<style lang="less">
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
