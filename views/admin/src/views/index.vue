<template>
  <div class="index">
    <h1>
      欢迎进入拼夕夕商品店！
    </h1>
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
  .index h1{ width: 600px; height: 200px; line-height: 200px; text-align: center; font-size: 30px; background-color: #dddddd; color: #666; border-radius: 10px; margin: 100px auto; letter-spacing: 4px; }
</style>