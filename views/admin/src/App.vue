<template>
  <div id="app">
    <layouts v-if="this.$store.state.isLogin"></layouts>
    <login v-else></login>
  </div>
</template>

<script>
import layouts from "./views/layouts";
import login from "./components/login";
export default {
  name: "app",
  components: {
    layouts: layouts,
    login: login
  },
  data() {
    return {};
  },
  mounted() {
    let state = sessionStorage.getItem("isLogin");
    this.$store.state.isLogin = state;
    this.$store.state.admin = sessionStorage.getItem("admin");
    // if (state) {
    //   this.$router.push({ path: "/" });
    // } 
    // else {
    //   this.$router.push({ path: "/login" });
    // }
  }
};
</script>


<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
