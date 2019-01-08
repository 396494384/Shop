<template>
  <div class="collections">
    <list :goods="collections"></list>
  </div>
</template>
<script>
import list from '../components/list'
export default {
  name: "collections",
  components:{
    'list' : list
  },
  data(){
    return{
      collections:[]
    }
  },
  created(){
    this.$store.state.pageTitle = '我的收藏';
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.$http.get('/api/collection/all').then(data=>{
      if(data.data.code == 200){
        this.collections = data.data.data
      }
    })
  }
}
</script>
<style>

</style>