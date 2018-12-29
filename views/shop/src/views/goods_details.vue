<template>
  <div class="goodsdetails">
    <img :src="this.details.image" class="details_img" />
    <div class="details_info">
      <h4 class="details_name">{{ this.details.name }}</h4>
      <span class="details_price">
        价格: {{ this.details.saleState ? this.details.salePrice : this.details.price | money }}
        <i v-if="this.details.saleState">原价: {{ this.details.price | money }}</i>
      </span>
    </div>
    <p class="details_desc">{{ this.details.desc }}</p>
    <div class="recommend" v-if="recommend.length > 0">
      <h3>相关推荐</h3>
      <div>
        <list :goods="recommend"></list>
      </div>
    </div>
  </div>
</template>
<script>
import list from '../components/list'
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
      recommend:[]
    }
  },
  created(){
    this.$store.state.pageTitle = '商品详情';
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.id = this.$route.query.id
    // 获取商品信息
    this.$http.get(`/api/goods/goods_details?id=${ this.id }`).then(data=>{
      this.details = data.data.data;
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
  .goodsdetails{ background-color: #fff; }
  .details_img{ display: block; width: 7.5rem; height: 7.5rem; border-bottom: 1px solid #f8f8f8; }
  .details_info{ padding: 0.3rem; }
  .details_name{ font-size: 0.4rem; line-height: 2; color: #666; margin-bottom: 0.2rem; }
  .details_price{ color: #F01414; }
  .details_price i{ font-size: 0.24rem; color: #999; text-decoration: line-through; margin-left: 0.3rem; }
  .details_desc{ line-height: 1.8; color: #999; padding: 0.2rem 0.3rem; }
  .recommend h3{ padding: 0 0.3rem; height: 0.88rem; line-height: 0.88rem; font-size: 0.32rem; color: #F01414; text-align: center; font-weight: bold; background-color: #f8f8f8; }

</style>