import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  goodsCategory(params) {
    return axios.get('/category/all', { params });
  },
  getProductsTable(params) {
    return axios.get('/products/all', { params });
  },
  deleteProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  productDetail(id) {
    return axios.get(`/products/${id}`);
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
