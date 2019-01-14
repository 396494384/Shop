<template>
  <div class="my">
    <div class="my_top">
      <img src="../assets/images/my/bg_my_top.jpg" class="bg" />
      <div class="user">
        <img src>
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="order_links">
      <dl>
        <dt>
          <strong>我的订单</strong>
          <router-link :to="{ path : '/my' }">
            <span>查看全部订单</span>
            <img src="../assets/images/my/icon_right2.png" />
          </router-link>
        </dt>
        <dd>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl1.png" />
            <span>待付款</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl2.png" />
            <span>待发货</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl3.png" />
            <span>待收货</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl4.png" />
            <span>已完成</span>
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl5.png" />
            <span>退款/售后</span>
          </router-link>
        </dd>
      </dl>
    </div>
    <div class="more_links">
      <ul>
        <li>
          <router-link :to="{ path : '/address' }">
            <span>
              <img src="../assets/images/my/icon_my1.png" />
              <span>收货地址</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/record' }">
            <span>
              <img src="../assets/images/my/icon_my2.png">
              <span>浏览记录</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/collections' }">
            <span>
              <img src="../assets/images/my/icon_my3.png">
              <span>我的收藏</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ path : '/' }">
            <span>
              <img src="../assets/images/my/icon_my4.png">
              <span>在线客服</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/' }">
            <span>
              <img src='../assets/images/my/icon_my5.png'>
              <span>联系我们</span>
            </span>
            <img class='icon_right' src='../assets/images/my/icon_right.png'>
          </router-link>
        </li> -->
      </ul>
    </div>
    <span class="logout" @click="logout">退出登录</span>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: "my",
  data() {
    return {
      name:""
    };
  },
  methods:{
    logout(){
      this.$http.get('/api/user/logout').then(data=>{
        if(data.data.code == 200){
          Toast({
            message: data.data.message,
            duration: 1000
          })
          setTimeout(()=>{
            sessionStorage.setItem('name', "");
            sessionStorage.setItem('id', "");
            this.$store.state.isLogin = false;
            this.$router.push({ path : '/' })
          },1000)
        }
      })
    },
  },
  created() {
    this.$store.state.pageTitle = "我的";
    this.$store.state.showFootBar = true;
    this.name = sessionStorage.getItem('name');
  }
};
</script>
<style scoped>
.my_top{ width: 100%; height: 3rem; position: relative; }
.my_top .bg, .my_top .user{ width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
.my_top .user img{ display: block; width: 1.52rem; height: 1.52rem; border-radius: 50%; border: 4px solid #fff; margin: 0 auto 0.2rem; }
.my_top .user span{ display: block; text-align: center; color: #fff; font-size: 0.3rem; }
.order_links{ width: 6.9rem; height: 1.97rem; margin: 0 auto; position: relative; }
.order_links dl{ width: 100%; height: 2.5rem; position: absolute; left: 0; bottom: 0; background-color: #fff; border-radius: 0.2rem; }
.order_links dt{ height: 0.86rem; padding: 0 0.3rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; align-content: center; }
.order_links dt strong{ font-size: 0.3rem; font-weight: bold; }
.order_links dt a{ display: flex; justify-content: flex-end; align-items: center; align-content: center; }
.order_links dt a span{ font-size: 0.26rem; color: #A0A0A0; }
.order_links dt a img{ width: 0.12rem; height: 0.22rem; margin-left: 0.16rem; }
.order_links dd{ width: 100%; height: 1.6rem; padding: 0 0.1rem; box-sizing: border-box; display: flex; flex-direction: row; }
.order_links dd a{position: relative; width: 1.34rem; height: 100%; display: flex; justify-content: center; align-items: center; align-content: center; flex-wrap: wrap; }
.order_links dd img{ width: 0.55rem; height: 0.49rem; }
.order_links dd span{ width: 100%; margin-top: 0.2rem; text-align: center; font-size: 0.24rem; }
.more_links{ padding: 0.3rem; }
.order_links dd a .circle{position: absolute;top: 0.4rem;right: 0.28rem;width: 0.28rem;height: 0.28rem;background: #FF6767;color: #fff;border-radius: 50%;line-height: 0.28rem;font-size: 0.18rem;font-family: Arial, Helvetica, sans-serif;}
.more_links .icon_right{ width: 0.13rem; height: 0.24rem; }
.more_links ul{ display: block; background-color: #fff; padding: 0.1rem 0; border-radius: 0.2rem; }
.more_links li{ display: block; height: 0.94rem; margin: 0 0.30rem; border-bottom: 1px solid #F0F0F0;  }
.more_links ul li:last-child{ border-bottom: none; }
.more_links a, .more_links label{ width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center; align-content: center; }
.more_links span{ height: 100%; display: flex; flex-direction: row; align-content: center; align-items: center; }
.more_links span img{ width: 0.40rem; height: 0.35rem; margin-right: 0.14rem; }
.logout{ display: block; margin: 0 0.3rem 0.4rem; text-align: center; color: #fff; line-height: 0.88rem; background-color: #FF6767; border-radius: 0.1rem; font-size: 0.28rem; }
</style>