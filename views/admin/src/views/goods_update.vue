<template>
  <div class="goods_add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link :to="{ path: '/' }">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form ref="form" label-position="left" :model="goodsData" label-width="110px">
        <el-form-item label="商品分类">
          <el-col :span="18">
            <el-select v-model="goodsData.category" placeholder="请选择商品分类">
              <el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-col :span="18">
            <el-input v-model="goodsData.name"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="商品图片">
          <el-col :span="18">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-form-item>-->
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
          <el-button type="primary" @click="goodsUpdate">提交修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods_add",
  data() {
    return {
      goodsId:"",
      categorys:[],
      goodsData: {
        category: "", //商品类型
        name: "", //商品名称
        price: "", //商品价格
        saleState: false, //是否打折
        salePrice: "", //打折后的价格
        sellType: "1", //售卖类型
        count: "", //商品库存
        desc: "" //商品描述
      }
    };
  },
  methods: {
    changeSaleState() {
      if (!this.goodsData.saleState) {
        this.goodsData.salePrice = "";
      }
    },
    goodsUpdate() {
      let goodsdata = this.goodsData;
      if (goodsdata.category == "") {
        this.showMsg("请选择商品分类");
      } else if (goodsdata.name == "") {
        this.showMsg("请输入商品名称");
      } else if (goodsdata.price == "") {
        this.showMsg("请输入商品价格");
      } else if (goodsdata.saleState && goodsdata.salePrice == "") {
        this.showMsg("请输入打折后的价格");
      } else if (goodsdata.count == "") {
        this.showMsg("请输入商品库存");
      } else if (goodsdata.desc == "") {
        this.showMsg("请输入商品描述");
      } else {
        this.$http.post('api/goods/update', {
          goodsId: this.goodsId,
          goodsData: goodsdata
        }).then(data => {
          console.log(data)
          if(data.data.code == 200){
            this.showMsg(data.data.message, "success");
            setTimeout(()=>{
              this.$router.push({ path: '/goods'})
            }, 1000)
          }
        });
      }
    },
    showMsg(str, type = 'error') {
      this.$message({
        duration: 1000,
        message: str,
        type: type
      });
    }
  },
  mounted(){
    this.goodsId = this.$route.query.id;
    // 获取商品分类
    this.$http.get('/api/categorys/all').then(data=>{
      if(data.data.code == 200){
        this.categorys = data.data.data
      }
    })
    // 获取要修改的商品信息
    this.$http.get(`/api/goods/get_goods?id=${ this.goodsId }`).then(data=>{
      this.goodsData = data.data.data;

    })
  }
};
</script>
<style scoped>
.avatar-uploader {
  width: 158px;
  height: 158px;
  border: 1px dashed #ddd;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 1px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
}
</style>