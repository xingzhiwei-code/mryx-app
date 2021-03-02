import Vue from 'vue';
import VueRouter from 'vue-router';
import getMenuRoutes from '../untils/promission';
import store from '../store';
import Home from '../views/layout/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const asyncRoutesMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
    },
    component: () => import('../views/page/productlist.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '商品添加',
      hidden: false,
    },
    component: () => import('../views/page/productadd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '商品编辑',
      hidden: true,
    },
    component: () => import('../views/page/productadd.vue'),
  }, {
    path: 'categroy',
    name: 'Categroy',
    meta: {
      title: '类目管理',
      hidden: false,
    },
    component: () => import('../views/page/categroy.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('../views/page/index.vue'),
      meta: {
        title: '统计',
        hidden: false,
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.appkey && store.state.userInfo.username
      && store.state.userInfo.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.userInfo.role, asyncRoutesMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
