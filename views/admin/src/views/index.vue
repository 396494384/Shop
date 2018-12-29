<template>
  <div class="index">
    <h1>this is index</h1>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  mounted(){
    this.$store.state.nav = [];
  }
};
</script>
<style scoped>

</style>