<template>
  <div class="car">
    <ul>
      <li>
        <label>
          <img src="../assets/images/icon_check1.png" />
          <!-- <img src="../assets/images/icon_check2.png" /> -->
        </label>
        <div>
          <router-link class="img" :to="{ path : '/goods_details' }"><img src="../assets/images/icon_check2.png" /></router-link>
          <span class="info">
            <router-link :to="{ path : '/goods_details' }">
              <strong>标题</strong>
              <i class="price">
                价格: 200 <b>价格: 200</b>
              </i>
            </router-link>
            <span class="count">
              <i>库存: 200</i>
              <b>
                <em class="minus">-</em>1<em class="add">+</em>
              </b>
            </span>
          </span>
        </div>
        <span class="del">
          <img src="../assets/images/icon_del.png" />
        </span>
      </li>
    </ul>
    <div class="car_bottom">
      <i>全选</i>
      <b>去支付</b>
      <span>总价: 2000</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'car',
  data(){
    return {}
  },
  created(){
    this.$store.state.pageTitle = '购物车';
    this.$store.state.showFootBar = true;
  }
}
</script>
<style>
  .car ul{ overflow: hidden; }
  .car li{ width: 8.5rem; height: 2rem; margin-bottom: 0.3rem; padding: 0.2rem 0;  box-shadow: 0 0 10px 1px #ddd; background-color: #fff; position: relative; transition: all 0.5s; }
  .car li.show_del{ margin-left: -0.8rem; }
  .car li label{ float: left; width: 1rem; height: 100%; position: relative; }
  .car li label img{ width: 0.5rem; height: 0.5rem; position: absolute; top: 50%; left: 0.3rem; margin-top: -0.25rem; }
  .car li div{ float: left; height: 100%; }
  .car li div .img img{ float: left; width: 2rem; height: 2rem; box-shadow: 0 0 1px 1px #eee inset;  }
  .car li .info{ float: left; width: 3.9rem; height: 2rem; margin-left: 0.3rem; padding: 0.2rem 0; box-sizing: border-box;}
  .car .info strong{ display: block; font-size: 0.32rem; color: #666; line-height: 2; }
  .car .info .price{ display: block; font-size: 0.24rem; color: #F01414; margin-bottom: 0.4rem; }
  .car .info .price b{ font-size: 0.2rem; color: #999; text-decoration: line-through; margin-left: 0.2rem; }
  .car .info .count { display: block; overflow: hidden; color: #999; }
  .car .info .count i{ font-size: 0.24rem; line-height: 0.4rem;  float: left; }
  .car .info .count b{ float: right; width: 1.5rem;  height: 0.4rem; line-height: 0.4rem; border: 1px solid #ddd; text-align: center; font-size: 0.24rem; }
  .car .info .count em{ width: 0.4rem; height: 100%; font-size: 0.28rem; }
  .car .info .count em.minus{ float: left; border-right: 1px solid #ddd; }
  .car .info .count em.add{ float: right; border-left: 1px solid #ddd; }
  .car li .del{ width: 1rem; height: 100%; position: absolute; right: 0; top: 0; border-left: 1px solid #eee; }
  .car li .del img{ width: 0.5rem; height: 0.5rem; position: absolute; top: 50%; right: 0.35rem; margin-top: -0.25rem; }
  .car_bottom{ padding:0.2rem 0.3rem; background-color: #fff; position: fixed; left: 0; right: 0; bottom: 1.08rem; border-bottom: 1px solid #ddd;  }
  .car_bottom i{ margin-right: 0.2rem; line-height: 0.66rem; font-size: 0.3rem; color: #666; letter-spacing: 1px; }
  .car_bottom span{ float: right; margin-right: 0.3rem; line-height: 0.66rem; color: #F01414; font-size: 0.28rem; } 
  .car_bottom b{ float: right; width: 1.5rem; height: 0.66rem; line-height: 0.66rem; font-size: 0.24rem; color: #fff; background-color: #F01414; text-align: center; border-radius: 0.66rem; }
</style>