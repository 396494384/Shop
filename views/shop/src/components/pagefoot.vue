<template>
  <div class="pagefoot">
    <div>
      <router-link class="active" :to="{ path: '/' }">
        <img src="../assets/images/icon_foot1.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active1.png"  />
        首页
      </router-link>
      <router-link :to="{ path: '/goods' }">
        <img src="../assets/images/icon_foot2.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active2.png"  />
        商品
      </router-link>
      <router-link :to="{ path: '/car' }">
        <img src="../assets/images/icon_foot3.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active3.png"  />
        购物车
      </router-link>
      <router-link :to="{ path: '/my' }">
        <img src="../assets/images/icon_foot4.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active4.png"  />
        我的
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name:"pagefoot",
  data(){
    return{}
  }
}
</script>
<style scoped>
.pagefoot{ position: fixed; bottom: 0; left: 0; right: 0; height: 1.08rem; }
.pagefoot div{ width: 7.5rem; height: 100%; margin: 0 auto; background-color: #eee; }
.pagefoot div a{ float: left; width: 25%; height: 100%; text-align: center; color: #999; font-size: 0.24rem; }
.pagefoot div a img{ display: block; width: 0.45rem; height: 0.45rem; margin: 0.15rem auto 0.1rem; }
.pagefoot div a img.active_img{ display: none; }
.pagefoot div a.active{ color: #F01414; }
.pagefoot div a.active img{ display: none; }
.pagefoot div a.active img.active_img{ display: block; }
</style> 