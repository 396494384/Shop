<template>
  <div class="category content">
    <el-row>
      <el-col :span="20">
        <el-input type="text" placeholder="请输入分类名称" v-model="category"></el-input>
      </el-col>
      <el-col :span="4" align="right">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="categoryAdd">添加新分类</el-button>
      </el-col>
    </el-row>
    <div class="tags">
      <h4>当前商品分类</h4>
      <el-alert v-if="categorys.length == 0" title="当前还没有商品分类!" type="error" :closable="false"></el-alert>
      <el-tag
        v-else
        v-for="(item, index) in categorys"
        :key="index"
        @close="categoryDel(item._id)"
        closable
      >{{ item.name }}</el-tag>
    </div>
  </div>
</template>
<script>
export default {
  name: "category",
  data() {
    return {
      categorys: [],
      category: ""
    };
  },
  methods: {
    categoryAdd() {
      if (this.category == "") {
        this.$message({
          duration: 1000,
          message: "请输入分类名称",
          type: "error"
        });
      } else {
        this.$http
          .get(`/api/categorys/add?name=${this.category}`)
          .then(data => {
            if (data.data.code == 200) {
              this.$message({
                duration: 1000,
                message: "保存成功",
                type: "success"
              });
              this.category = "";
              this.categorys = data.data.data;
            } else {
              this.$message({
                duration: 1000,
                message: data.data.message,
                type: "error"
              });
            }
          });
      }
    },
    categoryDel(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(`/api/categorys/del?id=${id}`).then(data => {
            if (data.data.code == 200) {
              this.$message({
                duration: 1000,
                message: "删除成功",
                type: "success"
              });
              this.categorys = this.categorys.filter(item => {
                return item._id != id;
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.$store.state.nav = [{ name: "商品分类", path: null }];
    this.$http.get("/api/categorys/all").then(data => {
      if (data.data.code == 200) {
        this.categorys = data.data.data;
      }
    });
  }
};
</script>
<style scoped>
.tags {
  padding-top: 20px;
}
.tags h4 {
  color: #409eff;
  padding: 20px 0 10px;
}
.tags .el-tag {
  margin: 10px 10px 0 0;
}
</style>


