<template>
  <div class="goods_add content">
    <el-form ref="form" label-position="left" label-width="110px">
      <el-form-item label="Banner图片">
        <el-col :span="18">
          <label for="image" class="image">
            <input id="image" name="file" type="file" @change="getImage($event)" ref="image">
            <img v-if="src == ''" src="../assets/images/upload.jpg">
            <img v-else :src="src">
          </label>
        </el-col>
      </el-form-item>
      <el-form-item label="是否关联商品">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-switch v-model="relation"></el-switch>
            </el-col>
            <el-col :span="5">
              <el-select v-model="selectedCategory" placeholder="请选择商品类型" :disabled="!relation" @change="categoryChange">
                <el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-select v-model="selectedGoods" placeholder="请选择要关联的商品" :disabled="!relation">
                <el-option v-for="(item, index) in goods" :key="index" :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBanner">添加Banner</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "goods_add",
  data() {
    return {
      src: "",
      relation:false,
      selectedCategory: '',
      selectedGoods:"",
      categorys:[],
      goods:[]
    };
  },
  methods: {
    //选择商品类型
    categoryChange(){
      this.goods = []
      this.selectedGoods = ""
      this.$http.post('/api/banner/change', { category : this.selectedCategory }).then(data=>{
        if(data.data.code == 200){
          this.goods = data.data.data
        }
      })
    },
    getImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.src = this.result;
      };
    },
    addBanner() {
      if(this.src == ""){
        this.showMsg("请选择Banner图片");
      }else if(this.relation && this.selectedCategory == ''){
        this.showMsg("请选择商品分类");
      }else if(this.relation && this.selectedGoods == ''){
        this.showMsg("请选择关联商品");
      } else {
        // 上传图片
        let formData = new FormData();
        formData.append("file", this.$refs.image.files[0]);
        this.$http({
          method: "post",
          url: "/api/banner/upload",
          anync: true,
          contentType: false,
          processData: false,
          data: formData
        }).then(data => {
            if (data.data.code == 200) {
              return data;
            } else {
              this.showMsg("图片上传失败", "error");
            }
          })
          .then(data => {
            //上传Banner
            let _src = data.data.data;
            this.$http.post("/api/banner/append", {
              image: _src,
              relation: this.relation,
              goods: this.selectedGoods
            }).then(data => {
              if (data.data.code == 200) {
                this.showMsg(data.data.message, "success");
                setTimeout(() => {
                  this.$router.push({ path: "/banner" });
                }, 1000);
              }
            });
          });
      }
    },
    close() {
      this.$router.go(-1);
    },
    showMsg(str, type = "error") {
      this.$message({
        duration: 1000,
        message: str,
        type: type
      });
    }
  },
  mounted() {
    this.$store.state.nav = [
      { name: "Banner管理", path: "/banner" },
      { name: "Banner添加", path: null }
    ];
    // 获取商品分类
    this.$http.get("/api/categorys/all").then(data => {
      this.categorys = data.data.data;
    });
  }
};
</script>
<style scoped>
.image input {
  width: 0;
  height: 0;
}
.image img {
  width: 375px;
  height: 200px;
}
</style>