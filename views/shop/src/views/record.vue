<template>
  <div class="record">
    <list :goods="record"></list>
  </div>
</template>
<script>
import list from '../components/list'
export default {
  name: "record",
  components:{
    'list' : list
  },
  data(){
    return{
      record:[]
    }
  },
  created(){
    this.$store.state.pageTitle = '浏览记录';
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.$http.get('/api/record/all').then(data=>{
      if(data.data.code == 200){
        this.record = data.data.data
      }
    })
  }
}
</script>
<style>

</style>