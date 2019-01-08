<template>
  <div class="pagefoot">
    <div>
      <span :class="{ 'active' : page == '/' }" @click="jupm('/')">
        <img src="../assets/images/icon_foot1.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active1.png"  />
        首页
      </span>
      <span :class="{ 'active' : page == '/goods' }" @click="jupm('/goods')">
        <img src="../assets/images/icon_foot2.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active2.png"  />
        商品
      </span>
      <span :class="{ 'active' : page == '/car' }" @click="jupm('/car')">
        <img src="../assets/images/icon_foot3.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active3.png"  />
        购物车
      </span>
      <span :class="{ 'active' : page == '/my' }" @click="jupm('/my')">
        <img src="../assets/images/icon_foot4.png"  />
        <img class="active_img" src="../assets/images/icon_foot_active4.png"  />
        我的
      </span>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  name:"pagefoot",
  data(){
    return{
      page: '/'
    }
  },
  methods:{
    jupm(path){
      if(path == '/car' || path == '/my'){
        if(this.$store.state.isLogin){
          this.$router.push({ path: path })
        }else{
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
          return;
        }
      }else{
        this.$router.push({ path: path })
      }
      this.page = path
    }
  },
  mounted(){
    this.page = this.$router.history.current.path
  }
}
</script>
<style scoped>
.pagefoot{ position: fixed; bottom: 0; left: 0; right: 0; height: 1.08rem; }
.pagefoot div{ width: 7.5rem; height: 100%; margin: 0 auto; background-color: #eee; }
.pagefoot div span{ float: left; width: 25%; height: 100%; text-align: center; color: #999; font-size: 0.24rem; }
.pagefoot div span img{ display: block; width: 0.45rem; height: 0.45rem; margin: 0.15rem auto 0.1rem; }
.pagefoot div span img.active_img{ display: none; }
.pagefoot div span.active{ color: #FF6867; }
.pagefoot div span.active img{ display: none; }
.pagefoot div span.active img.active_img{ display: block; }
</style> 