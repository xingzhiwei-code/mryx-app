import Vue from 'vue';
import Vuex from 'vuex';

import { setUserCookie, getUserCookie, removeUserCookie } from '../untils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false 代表不闭合  true代表闭合
    collapsed: false,
    // 用户状态信息
    userInfo: getUserCookie(),
    // 菜单路由
    menuRoutes: [],
  },
  mutations: {
    // 左边状态栏收闭状态
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 删除用户cookie
    logout(state) {
      state.userInfo = {
        username: '',
        email: '',
        role: '',
        appkey: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
