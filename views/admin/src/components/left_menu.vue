<template>
  <div class="leftmenu">
    <el-aside width="200px">
      <el-menu class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-menu-item index="1">
          <router-link slot="title" :to="{ path:'/' }">
            <i class="el-icon-menu"></i>首页
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link slot="title" :to="{ path:'/category' }">
            <i class="el-icon-star-on"></i>商品分类
          </router-link>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <router-link :to="{ path:'/goods' }">
                <i class="el-icon-caret-right"></i>商品列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link :to="{ path:'/goods_add' }">
                <i class="el-icon-caret-right"></i>商品添加
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <router-link slot="title" :to="{ path:'/order' }">
            <i class="el-icon-star-on"></i>订单管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link slot="title" :to="{ path:'/user' }">
            <i class="el-icon-setting"></i>用户管理
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
export default {
  name: 'leftmenu',
  data(){
    return{}
  }
}
</script>
<style>
.leftmenu, .el-aside{ height: 100%; }
.el-menu li .router-link-exact-active{ color: #fff; }
.leftmenu .el-menu-item.is-active i{ color: #909399; }
.el-menu li:hover{ background-color: #434A50; }
</style>
