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
    this.$http.get('/api/user/state').then(data=>{
      if(data.data.code == 200){
        sessionStorage.setItem('name', data.data.data.name);
        sessionStorage.setItem('id', data.data.data.id);
        this.$store.state.isLogin = true;
      }
    })
  }
}
</script>

<style>
  #app{ width: 100%; height: 100%; font-size: 0.28rem; }
  img.not{ display: block; width: 7.5rem; }
</style>
