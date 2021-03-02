import store from '@/store';

const axios = require('axios');

axios.defaults.baseURL = 'https://mallapi.duyiedu.com/';

axios.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.userInfo.appkey,
    },
  };
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default axios;
