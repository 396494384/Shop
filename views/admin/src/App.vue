<template>
  <div id="app">
    <layouts v-if="this.$store.state.isLogin"></layouts>
    <login v-else></login>
  </div>
</template>

<script>
import layouts from "./views/layouts";
import login from "./components/login";
export default {
  name: "app",
  components: {
    layouts: layouts,
    login: login
  },
  data() {
    return { };
  },
  created(){
    this.$http.get('/api/admin/state').then(data=>{
      if(data.data.code == 200){
        this.$store.state.isLogin = data.data.data.isLogin;
        this.$store.state.admin = data.data.data.name;
      }else{
        this.$store.state.isLogin = false;
        this.$store.state.admin = "";
      }
      sessionStorage.setItem('isLogin', this.$store.state.isLogin);
      sessionStorage.setItem('admin', this.$store.state.admin);
    })
  }
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
.pager{ text-align: center; padding: 20px 0 30px; }
</style>
