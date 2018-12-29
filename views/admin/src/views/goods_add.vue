<template>
  <div class="goods_add content">
    <el-form ref="form" label-position="left" :model="goodsData" label-width="110px">
      <el-form-item label="商品分类">
        <el-col :span="18">
          <el-select v-model="goodsData.category" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in categorys"
              :key="index"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-col :span="18">
          <el-input v-model="goodsData.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-col :span="18">
          <label for="image" class="image">
            <input id="image" name="file" type="file" @change="getImage($event)" ref="image">
            <img v-if="src == ''" src="../assets/images/upload.jpg">
            <img v-else :src="src">
          </label>
        </el-col>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-col :span="18">
          <el-input v-model="goodsData.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品折扣">
        <el-col :span="2">
          <el-switch v-model="goodsData.saleState" @change="changeSaleState"></el-switch>
        </el-col>
        <el-col :span="16">
          <el-input
            :disabled="!goodsData.saleState"
            v-model="goodsData.salePrice"
            placeholder="请输入折扣后的价格"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-col :span="18">
          <el-input v-model="goodsData.count"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="售卖类型">
        <el-radio-group v-model="goodsData.sellType">
          <el-radio label="1" value="1">普通商品</el-radio>
          <el-radio label="2" value="2">热门商品</el-radio>
          <el-radio label="3" value="3">最新上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-col :span="18">
          <el-input type="textarea" v-model="goodsData.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGoods">添加商品</el-button>
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
      categorys: [],
      goodsData: {
        category: "", //商品类型
        name: "", //商品名称
        image: "", //商品图片
        price: "", //商品价格
        saleState: false, //是否打折
        salePrice: "", //打折后的价格
        sellType: "1", //售卖类型
        count: "", //商品库存
        desc: "" //商品描述
      },
      src: ""
    };
  },
  methods: {
    getImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.src = this.result;
      };
    },
    changeSaleState() {
      if (!this.goodsData.saleState) {
        this.goodsData.salePrice = "";
      }
    },
    addGoods() {
      let goodsdata = this.goodsData;
      if (goodsdata.category == "") {
        this.showMsg("请选择商品分类");
      } else if (goodsdata.name == "") {
        this.showMsg("请输入商品名称");
      } else if (this.src == "") {
        this.showMsg("请选择要上传的商品图片");
      } else if (goodsdata.price == "") {
        this.showMsg("请输入商品价格");
      } else if (goodsdata.saleState && goodsdata.salePrice == "") {
        this.showMsg("请输入打折后的价格");
      } else if (goodsdata.count == "") {
        this.showMsg("请输入商品库存");
      } else if (goodsdata.desc == "") {
        this.showMsg("请输入商品描述");
      } else {
        // 上传图片
        let formData = new FormData();
        formData.append("file", this.$refs.image.files[0]);
        this.$http({
          method: "post",
          url: "api/goods/upload",
          anync: true,
          contentType: false,
          processData: false,
          data: formData
        })
          .then(data => {
            if (data.data.code == 200) {
              return data;
            } else {
              this.showMsg("图片上传失败", "error");
            }
          })
          .then(data => {
            //上传商品信息
            goodsdata.image = data.data.data;
            this.$http.post("api/goods/add", goodsdata).then(data => {
              if (data.data.code == 200) {
                this.showMsg(data.data.message, "success");
                setTimeout(() => {
                  this.$router.push({ path: "/goods" });
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
      { name: "商品管理", path: "/goods" },
      { name: "商品添加", path: null }
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
  width: 150px;
  height: 150px;
}
</style>