<template>
  <div class="breadnav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link v-if="nav.length > 0" :to="{ path: '/' }">首页</router-link>
        <span v-else>首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in nav" :key="index">
        <router-link v-if="item.path" :to="{ path: item.path }">{{ item.name }}</router-link>
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name:"breadnav",
  props:{
    'nav': {
      type: Array,
      default: []
    }
  },
  data(){
    return {}
  },
  mounted(){
    // console.log(this.nav)
  }
}
</script>
<style scoped>

</style>