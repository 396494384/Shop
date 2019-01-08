import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Goods from './views/goods'
import GoodsAdd from './views/goods_add'
import GoodsUpdate from './views/goods_update'
import GoodsDetails from './views/goods_details'
import Order from './views/order'
import User from './views/user'
// import Login from './views/login'
import Category from './views/category'
import Banner from './views/banner'
import BannerAdd from './views/banner_add'
import BannerUpdate from './views/banner_update'
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
      path: '/banner',
      name: 'Banner',
      component: Banner
    }, {
      path: '/banner_add',
      name: 'BannerAdd',
      component: BannerAdd
    }, {
      path: '/banner_update',
      name: 'BannerUpdate',
      component: BannerUpdate
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
      path: '/goods_details',
      name: 'GoodsDetails',
      component: GoodsDetails
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/user',
      name: 'User',
      component: User
    }
    // , {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // }
  ]
})
