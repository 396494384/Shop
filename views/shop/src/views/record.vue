<template>
  <div class="record">
    <list :goods="record"></list>
    <img v-if="record.length == 0 && loadComplete" class="not" src="../assets/images/not.png" />
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
      loadComplete: false,
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
        this.record = data.data.data;
        this.loadComplete = true;
      }
    })
  }
}
</script>
<style>

</style>