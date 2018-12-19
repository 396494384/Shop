<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="21">
            <span class="logo">拼夕夕商品店</span>
          </el-col>
          <el-col :span="3">
            <el-dropdown trigger="click">
              <img src="/" class="photo" /><span class="el-dropdown-link">admin <i class="el-icon-caret-bottom"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-star-on"></i>
              <span slot="title"><router-link :to="{ path:'/category' }">商品分类</router-link></span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <i class="el-icon-caret-right"></i><router-link :to="{ path:'/goods' }">商品列表</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-caret-right"></i><router-link :to="{ path:'/goods_add' }">商品添加</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <i class="el-icon-star-on"></i>
              <span slot="title"><router-link :to="{ path:'/order' }">订单管理</router-link></span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title"><router-link :to="{ path:'/user' }">用户管理</router-link></span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>拼夕夕商品店</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{}
  }
}
</script>


<style>
#app {
  width: 100%;
  height: 100%;
}


</style>
