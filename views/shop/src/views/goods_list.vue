<template>
  <div class="goodslist">
    <list :goods="list"></list>
  </div>
</template>
<script>
import list from '../components/list'
export default {
  name:"goodslist",
  components:{
    "list": list
  },
  data(){
    return {
      sendData:{
        sellType: '1',
        count: 8
      },
      list: [],
    }
  },
  methods:{
    
  },
  created(){
    this.$store.state.pageTitle = '商品列表';
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.sendData.sellType = this.$route.query.type;
    this.$http.post('/api/goods/get_goods', this.sendData).then(data=>{
      this.list = data.data.data;
    })
  }
}
</script>
<style>

</style>
