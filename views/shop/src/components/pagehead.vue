<template>
  <div class="pagehead">
    <mt-header fixed :title="this.$store.state.pageTitle">
      <span @click="back" slot="left" v-if="!this.$store.state.showFootBar">
        <mt-button icon="back"></mt-button>
      </span>
      <mt-button v-if="!this.$store.state.isLogin" slot="right" @click="toLogin">登录</mt-button>
    </mt-header>
  </div>
</template>
<script>
export default {
  name:"pagehead",
  data(){
    return {}
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    toLogin(){
      this.$router.push({ path : '/login' })
    }
  },
  created(){
    if(sessionStorage.getItem('userid')){
      this.$store.state.isLogin = true
    }
  }
}
</script>
<style>
.pagehead .mint-header{ height: 0.88rem; background-color: #FF6867; padding: 0 0.3rem; }
.pagehead .mint-header h1{ color: #fff; font-size: 0.32rem; letter-spacing: 1px; }
.pagehead label, .pagehead .mintui{ color: #fff; }
</style>