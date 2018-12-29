<template>
  <div class="index">
    <mt-swipe :auto="3000" :prevent="true">
      <mt-swipe-item>1111111</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <div class="module" v-if="news.length != 0">
      <div class="module_title">
        <h4>
          <img src="../assets/images/icon_new.png" /><span>最新上架</span>
        </h4>
        <router-link class="more_link" :to="{ path: '/goods_list', query:{ type: '3' } }"><img src="../assets/images/icon_right.png" /></router-link>
      </div>
      <div class="module_list">
        <list :goods="news"></list>
      </div>
    </div>
    <div class="module" v-if="hots.length != 0">
      <div class="module_title">
        <h4>
          <img src="../assets/images/icon_hot.png" /><span>热门商品</span>
        </h4>
        <router-link class="more_link" :to="{ path: '/goods_list', query:{ type: '2' } }"><img src="../assets/images/icon_right.png" /></router-link>
      </div>
      <div class="module_list">
        <list :goods="hots"></list>
      </div>
    </div>
    <div class="module" v-if="goods.length != 0">
      <div class="module_title">
        <h4>
          <img src="../assets/images/icon_goods.png" /><span>更多商品</span>
        </h4>
        <router-link class="more_link" :to="{ path: '/goods_list', query:{ type: '1' } }"><img src="../assets/images/icon_right.png" /></router-link>
      </div>
      <div class="module_list">
        <list :goods="goods"></list>
      </div>
    </div>
  </div>
</template>
<script>
import list from '../components/list'
export default {
  name:'index',
  components:{
    'list': list
  },
  data(){
    return {
      news:[],
      hots:[],
      goods:[]
    }
  },
  created(){
    this.$store.state.pageTitle = '首页';
    this.$store.state.showFootBar = true;
  },
  mounted(){
    // 普通商品
    this.$http.post('/api/goods/get_goods', {
      sellType: '1',
      count: 8
    }).then(data=>{
      this.goods = data.data.data;
    })
    // 2:热门商品
    this.$http.post('/api/goods/get_goods', {
      sellType: '2',
      count: 6
    }).then(data=>{
      // console.log(data.data.data)
      this.hots = data.data.data;
    })
    // 3:最新上架
    this.$http.post('/api/goods/get_goods', {
      sellType: '3',
      count: 6
    }).then(data=>{
      // console.log(data.data.data)
      this.news = data.data.data;
    })
  }
}
</script>
<style>
.index .mint-swipe{ width: 7.5rem; height: 4rem; background-color: #fff; }
.module{ background-color: #fff; margin: 0.3rem 0 0; }
.module .module_title{ padding: 0 0.3rem; height: 0.88rem; border-bottom: 1px solid #f8f8f8; position: relative; }
.module .module_title h4{ width: 3rem; font-size: 0.32rem; margin: 0 auto; color: #F01414; font-weight: bold; text-align: center; }
.module .module_title h4 img{ width: 0.45rem; height: 0.45rem; vertical-align: middle; margin: -5px 0.1rem 0 0; }
.module .module_title h4 span{ line-height: 0.88rem; }
.module .more_link{ position: absolute; top: 0; bottom: 0; right: 0.3rem; }
.module .more_link img{ width: 0.2rem; height: 0.35rem; margin-top: 0.27rem; }
/* .module .module_list{ padding: 0.3rem; } */
</style>