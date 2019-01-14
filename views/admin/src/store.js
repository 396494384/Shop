import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:true, //保存登录状态
    admin:"", //保存登录用户名
    nav:[], //面包导航
    loading: false,
    loadingText:"加载数据中..."
  },
  mutations: {

  },
  actions: {

  }
})
