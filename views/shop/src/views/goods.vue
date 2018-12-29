<template>
  <div class="goods">
    goods
  </div>
</template>
<script>
export default {
  name:'goods',
  data(){
    return {}
  },
  created(){
    this.$store.state.pageTitle = '商品列表';
    this.$store.state.showFootBar = true;
  }
}
</script>
<style>

</style>