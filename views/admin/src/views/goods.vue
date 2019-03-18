<template>
  <div class="goods content">
    <div class="screen">
      <el-row :gutter="20" class="row1">
        <el-col :span="24">
          <router-link :to="{ path: '/goods_add' }">
            <el-button type="primary" icon="el-icon-circle-plus-outline">添加新的商品</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-input placeholder="请输入名称" v-model="sendData.name">
              <template slot="prepend">商品名称</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="sendData.category" placeholder="请选择商品类型">
            <el-option label="全部" value="" >全部</el-option>
            <el-option
              v-for="(item, index) in categorys"
              :key="index"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="9" class="radio">
          <el-radio v-model="sendData.countType" label="1">显示全部</el-radio>
          <el-radio v-model="sendData.countType" label="2">只显示有货</el-radio>
          <el-radio v-model="sendData.countType" label="3">只显示无货</el-radio>
        </el-col>
        <el-col :span="5" class="search_btn">
          <el-button type="defaule" icon="el-icon-delete" size="medium" @click="empty">清空</el-button>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="goods" border style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="category.name" label="类型" align="center" width="150"></el-table-column>
      <el-table-column label="价格" align="center" width="250">
        <template slot-scope="scope">{{ scope.row.saleState ? scope.row.salePrice : scope.row.price | money }} <span v-if="scope.row.saleState" style="font-size: 12px; color: #999;">( 原价:{{ scope.row.price | money }} )</span> </template>
      </el-table-column>
      <el-table-column prop="count" label="库存" align="center" width="150"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <router-link :to="{ path : '/goods_details', query:{ id: scope.row._id }}">
            <el-button type="primary" size="mini" icon="el-icon-view">查看</el-button>
          </router-link>
          <router-link :to="{ path : '/goods_update', query:{ id: scope.row._id }}">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button @click="goodsDel(scope.row)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination background layout="prev, pager, next" :current-page="sendData.page" :page-size="limit" :total="total" @current-change="pagination"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      categorys: [],
      goods: [],
      total:0,
      limit:1,
      sendData: {
        page: 1,
        name: "",
        category: "",
        countType: "1"
      }
    };
  },
  methods: {
    // 搜索
    search() {
      this.sendData.page = 1;
      this.getGoods()
    },
    // 清空搜索
    empty(){
      this.sendData = {
        page: 1,
        name: "",
        category: "",
        countType: "1"
      }
      this.search()
    },
    // 删除单个商品
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
                message: "删除成功",
                type: "success"
              });
              this.getGoods()
            }
          });
        }).catch(() => {});
    },
    // 分页
    pagination(page){
      this.sendData.page = page;
      this.getGoods()
    },
    // 获取商品
    getGoods(){
      this.$http.post("/api/goods/all", this.sendData).then(data => {
        if (data.data.code == 200) {
          this.goods = data.data.data.goods;
          this.total = data.data.data.total;
          this.limit = data.data.data.limit;
          this.$store.state.loading = false;
        }
      });
    }
  },
  beforeCreate(){
    this.$store.state.loading = true;
    this.$store.state.nav = [
      { name: "商品管理", path: '/goods' },
      { name: "商品列表", path: null }
    ]
  },
  mounted() {
    // 获取商品
    this.getGoods()
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
.content table .el-button {
  margin: 0 5px;
}
</style>


