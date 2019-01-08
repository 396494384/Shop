import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Goods from './views/goods'
import Car from './views/car'
import My from './views/my'
import Login from './views/login'
import Register from './views/register'
import GoodsList from './views/goods_list'
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
      name: 'Index',
      component: Index
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/car',
      name: 'Car',
      component: Car
    }, {
      path: '/my',
      name: 'My',
      component: My
    }, {
      path: '/goods_list',
      name: 'GoodsList',
      component: GoodsList
    }, {
      path: '/goods_details',
      name: 'GoodsDetails',
      component: GoodsDetails
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/collections',
      name: 'Collections',
      component: Collections
    }, {
      path: '/record',
      name: 'Record',
      component: Record
    }, {
      path: '/address',
      name: 'Address',
      component: Address
    }, {
      path: '/address_form',
      name: 'AddressForm',
      component: AddressForm
    }
  ]
})
