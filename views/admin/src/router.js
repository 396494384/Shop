import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Goods from './views/goods'
import GoodsAdd from './views/goods_add'
import GoodsUpdate from './views/goods_update'
import Order from './views/order'
import User from './views/user'
import Category from './views/category'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/category',
      name: 'Category',
      component: Category
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/goods_add',
      name: 'GoodsAdd',
      component: GoodsAdd
    }, {
      path: '/goods_update',
      name: 'GoodsUpdate',
      component: GoodsUpdate
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
