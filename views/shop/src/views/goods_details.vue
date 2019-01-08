<template>
  <div class="goodsdetails">
    <img :src="details.image" class="details_img" />
    <div class="details_info">
      <h4 class="details_name">
        <span>{{ details.name }}</span> 
        <img v-if="!collectionState" src="../assets/images/icon_collection1.png" @click="appendCollection" />
        <img v-else src="../assets/images/icon_collection2.png" @click="cancelCollection" />
      </h4>
      <span class="details_price">
        价格: {{ details.saleState ? details.salePrice : details.price | money }}
        <i v-if="details.saleState">原价: {{ details.price | money }}</i>
      </span>
    </div>
    <p class="details_desc">{{ details.desc }}</p>
    <div class="recommend" v-if="recommend.length > 0">
      <h3>相关推荐</h3>
      <div>
        <list :goods="recommend"></list>
      </div>
    </div>
    <div class="bottom">
      <span class="count">
        <i>库存: {{ details.count }}</i>
        <b>
          <em class="minus" @click="minus">-</em>{{ count }}<em class="add" @click="add">+</em>
        </b>
      </span>
      <p>
        <span class="append" @click="append">加入购物车</span>
        <span class="pay" @click="pay">去支付</span>
      </p>
    </div>
  </div>
</template>
<script>
import list from '../components/list'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'goodsdetails',
  components:{
    "list": list
  },
  data(){
    return {
      id:null,
      details:{
        price:0
      },
      collectionState:false,
      count:1,
      recommend:[]
    }
  },
  methods:{
    judgeLogin(){
      if(!this.$store.state.isLogin){
        MessageBox({
            title: '提示',
            message: '还没有登录!',
            showCancelButton: true,
            confirmButtonText: "去登录"
          }).then(action => {
            if(action == 'confirm'){
              this.$router.push({ path : '/login' })
            }
          })
        return false;
      }
      return true
    },
    // 添加收藏
    appendCollection(){
      if(!this.judgeLogin()){ return }
      this.$http.post('/api/collection/append', { goodsid : this.details._id }).then(data=>{
        if(data.data.code == 200){
          this.collectionState = !this.collectionState
          Toast({
            message: data.data.message,
            duration: 1000
          })
        }
      })
    },
    // 取消收藏
    cancelCollection(){
      if(!this.judgeLogin()){ return }
      this.$http.post('/api/collection/cancel', { goodsid : this.details._id }).then(data=>{
        if(data.data.code == 200){
          this.collectionState = !this.collectionState
          Toast({
            message: data.data.message,
            duration: 1000
          })
        }
      })
    },
    add(){
      this.count++;
      this.count = Math.min(this.count, this.details.count);
    },
    minus(){
      this.count--;
      this.count = Math.max(1, this.count);
    },
    append(){
      if(!this.judgeLogin()){ return }
      this.$http.post('/api/car/append', {
        id: this.details._id,
        count: this.count
      }).then(data=>{
        if(data.data.code == 200){
          MessageBox({
            title: '提示',
            message: '加入购物车成功',
            showCancelButton: true,
            confirmButtonText: "去购物车"
          }).then(action => {
            if(action == 'confirm'){
              this.$router.push({ path : '/car' })
            }
          })
        }
      })
    },
    pay(){
      MessageBox({
        title: '提示',
        message: '还未开通支付功能，敬请期待！'
      }).then(action => {})
    }
  },
  created(){
    this.$store.state.pageTitle = '商品详情';
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.id = this.$route.query.id
    // 获取商品信息
    this.$http.get(`/api/goods/details?id=${ this.id }`).then(data=>{
      this.details = data.data.data.details;
      this.collectionState = data.data.data.collection
      return this.details;
    }).then(details=>{
      // 获取商品推荐
      this.$http.post('/api/goods/get_goods', {
        category: details.category._id,
        count: 6
      }).then(data=>{
        this.recommend = data.data.data.filter(item=>{ return item._id !=  details._id});
      })
    })
  }
}
</script>
<style scoped>
  .goodsdetails{ background-color: #fff; padding-bottom: 1.8rem; }
  .details_img{ display: block; width: 7.5rem; height: 7.5rem; border-bottom: 1px solid #f8f8f8; }
  .details_info{ padding: 0.3rem; }
  .details_name{ margin-bottom: 0.2rem; overflow: hidden; }
  .details_name span{ float: left; width: 5rem; font-size: 0.4rem; line-height: 2; color: #666; }
  .details_name img{ float: right; width: 0.5rem; height: 0.5rem;margin-top: 0.15rem; }
  .details_price{ color: #FF6867; }
  .details_price i{ font-size: 0.24rem; color: #999; text-decoration: line-through; margin-left: 0.3rem; }
  .details_desc{ line-height: 1.8; color: #999; padding: 0.2rem 0.3rem; }
  .recommend h3{ padding: 0 0.3rem; height: 0.88rem; line-height: 0.88rem; font-size: 0.32rem; color: #FF6867; text-align: center; font-weight: bold; background-color: #f8f8f8; }
  .bottom {  position: fixed; bottom: 0; left: 0; right: 0; background-color: #fff; border-top: 1px solid #eee; }
  .bottom .count { padding: 0.2rem 0.3rem; display: block; overflow: hidden; color: #999; }
  .bottom .count i{ line-height: 0.5rem;  float: left; }
  .bottom .count b{ float: right; width: 1.8rem;  height: 0.5rem; line-height: 0.5rem; border: 1px solid #ddd; text-align: center; }
  .bottom .count em{ width: 0.5rem; height: 100%; }
  .bottom .count em.minus{ float: left; border-right: 1px solid #ddd; }
  .bottom .count em.add{ float: right; border-left: 1px solid #ddd; }
  .bottom p{ width: 100%; height: 0.86rem; line-height: 0.86rem; color: #fff; text-align: center; font-size: 0.32rem; }
  .bottom p span{ float: left; width: 50%; height: 100%; background-color: #FF3333; }
  .bottom .append{ background-color: #FF6867; }

</style>