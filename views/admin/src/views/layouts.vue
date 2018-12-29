<template>
  <div class="layouts">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="21">
            <span class="logo">拼夕夕商品店</span>
          </el-col>
          <el-col :span="3">
            <el-dropdown trigger="click">
              <img src="/" class="photo">
              <span class="el-dropdown-link">{{ this.$store.state.admin }}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <leftmenu></leftmenu>
        <el-container v-loading="this.$store.state.loading" :element-loading-text="this.$store.state.loadingText">
          <el-main>
            <breadnav :nav="this.$store.state.nav"></breadnav>
            <router-view/>
          </el-main>
          <el-footer>拼夕夕商品店</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import leftmenu from '../components/left_menu'
import breadnav from '../components/bread_nav'
export default {
  name: 'layouts',
  components:{
    "leftmenu": leftmenu,
    "breadnav": breadnav
  },
  data(){
    return {}
  }
}
</script>
<style scoped>
  .layouts{ height: 100%; }
</style>

