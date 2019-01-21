import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Goods from './views/goods'
import Car from './views/car'
import My from './views/my'
import Login from './views/login'
import Register from './views/register'
import GoodsDetails from './views/goods_details'
import Collections from './views/collections'
import Record from './views/record'
import Address from './views/address'
import AddressForm from './views/address_form'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index
    }, {
      path: '/index',
      component: Index
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/car',
      component: Car
    }, {
      path: '/my',
      component: My
    }, {
      path: '/goods_details',
      component: GoodsDetails
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/collections',
      component: Collections
    }, {
      path: '/record',
      component: Record
    }, {
      path: '/address',
      component: Address
    }, {
      path: '/address_form',
      component: AddressForm
    }
  ]
})
