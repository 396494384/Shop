<template>
  <div class="content banner">
    <el-row :gutter="20" class="row1">
        <el-col :span="24">
          <router-link :to="{ path: '/banner_add' }">
            <el-button type="primary" icon="el-icon-circle-plus-outline">添加新的Banner</el-button>
          </router-link>
        </el-col>
      </el-row>
    <el-table :data="banner" border style="width: 100%">
      <el-table-column align="center" label="Banner图片" width="460">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goods.name" label="关联商品" width="460">
        <template slot-scope="scope">
          <span v-if="scope.row.relation">{{ scope.row.goods.name }}</span>
          <span v-else>未关联商品</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{ path : '/banner_update', query:{ id: scope.row._id }}">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button @click="remove(scope.row._id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'banner',
  data(){
    return {
      banner:[]
    }
  },
  methods:{
    remove(id){
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        this.$http.post('/api/banner/remove', { id: id }).then(data=>{
          if (data.data.code == 200) {
            this.$message({
              duration: 1000,
              message: "删除成功",
              type: "success"
            });
            this.banner = this.banner.filter(item => item._id != id );
          }
        })
      }).catch(()=>{})
    }
  },
  created(){
    this.$store.state.nav = [
      { name: "Banner管理", path: "/banner" },
      { name: "Banner列表", path: null }
    ];
  },
  mounted(){
    this.$http.get('/api/banner/all').then(data=>{
      if(data.data.code == 200){
        this.banner = data.data.data
      }
    })
  }
}
</script>
<style scoped>
.banner .row1 {
  padding-bottom: 20px;
}
.content table img {
  margin: 0 auto;
  display: block;
  width: 375px;
  height: 200px;
}
.content table .el-button {
  margin: 0 5px;
}
</style>
