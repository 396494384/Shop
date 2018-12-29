<template>
  <div class="my">
    my
  </div>
</template>
<script>
export default {
  name:'my',
  data(){
    return {}
  },
  created(){
    this.$store.state.pageTitle = '我的';
    this.$store.state.showFootBar = true;
  }
}
</script>
<style>

</style>