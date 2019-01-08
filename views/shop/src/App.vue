<template>
  <div id="app">
    <layouts></layouts>
  </div>
</template>
<script>
import layouts from './views/layouts'
export default {
  name: 'app',
  components:{
    'layouts' : layouts
  },
  created(){
    this.$http.post('/api/state').then(data=>{
      if(data.data.code == 200){
        sessionStorage.setItem('username', data.data.data.username);
        sessionStorage.setItem('userid', data.data.data.id);
        this.$store.state.isLogin = true;
      }
    })
  }
}
</script>

<style>
  #app{ width: 100%; height: 100%; font-size: 0.28rem; }
</style>
