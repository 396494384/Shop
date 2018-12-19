<template>
  <div class="goods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link :to="{ path: '/' }">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="screen">
        <el-row :gutter="20" class="row1">
          <el-col :span="24">
            <router-link :to="{ path: '/goods_add' }"><el-button type="primary" icon="el-icon-circle-plus-outline">添加新的商品</el-button></router-link>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-input placeholder="请输入名称" v-model="input3">
                <template slot="prepend">商品名称</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <el-select v-model="searchData.category" placeholder="请选择商品类型">
              <el-option
                v-for="(item, index) in categorys"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="radio">
            <el-radio v-model="searchData.sellType" label="1">显示全部</el-radio>
            <el-radio v-model="searchData.sellType" label="2">只显示有货</el-radio>
            <el-radio v-model="searchData.sellType" label="3">只显示无货</el-radio>
          </el-col>
          <el-col :span="5" class="search_btn">
            <el-button type="defaule" icon="el-icon-delete" size="medium" >清空</el-button>
            <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="goods" border style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="category.name" label="类型" align="center" width="150"></el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="150"></el-table-column>
        <el-table-column prop="count" label="库存" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="mini"
              icon="el-icon-view"
            >查看</el-button>
            <router-link :to="{ path : '/goods_update', query:{ id: scope.row._id }}">
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            </router-link>
            <el-button
              @click="goodsDel(scope.row)"
              type="danger"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      categorys:[],
      goods: [],
      searchData:{
        name:'',
        category:'',
        sellType: '1'
      }
    };
  },
  methods: {
    search(){

    },
    goodsDel(item) {
      let goodsId = item._id;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.get("/api/goods/del?id=" + item._id).then(data => {
          if (data.data.code == 200) {
            this.$message({
              duration: 1000,
              message: '删除成功',
              type: 'success'
            });
            this.goods = this.goods.filter(item => { return item._id != goodsId; });
          }
        });
      }).catch(() => {});
    }
  },
  mounted() {
    // 获取商品
    this.$http.get("/api/goods/all").then(data => {
      if (data.data.code == 200) {
        this.goods = data.data.data;
      }
    });
    // 获取商品分类
    this.$http.get("/api/categorys/all").then(data => {
      if (data.data.code == 200) {
        this.categorys = data.data.data;
      }
    });
  }
};
</script>
<style scoped>
.screen,
.screen .row1 {
  padding-bottom: 20px;
}
.screen .radio {
  padding-top: 12px;
}
.screen .el-radio {
  margin-left: 20px;
}
.screen .search_btn {
  text-align: right;
}
.content table .el-button{ margin: 0 5px; }
</style>


