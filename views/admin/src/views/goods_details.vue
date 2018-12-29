<template>
  <div class="goods_details content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ goodsData.name }}</span>
      </div>
      <el-row>
        <el-col :span="4">商品图片:</el-col>
        <el-col :span="20"><img :src="goodsData.image" /></el-col>
        <el-col :span="4">商品分类:</el-col>
        <el-col :span="20">{{ goodsData.category.name }}</el-col>
        <el-col :span="4">商品价格:</el-col>
        <el-col :span="20">{{ goodsData.price }}</el-col>
        <el-col :span="4">商品折扣:</el-col>
        <el-col :span="20">{{ goodsData.saleState ? "有折扣" : "没有折扣" }}</el-col>
        <el-col v-if="goodsData.saleState" :span="4">折扣价格:</el-col>
        <el-col v-if="goodsData.saleState" :span="20">{{ goodsData.salePrice }}</el-col>
        <el-col :span="4">商品库存:</el-col>
        <el-col :span="20">{{ goodsData.count }}</el-col>
        <el-col :span="4">售卖类型:</el-col>
        <el-col :span="20">{{ goodsData.sellType }}</el-col>
        <el-col :span="4">商品描述:</el-col>
        <el-col :span="20">{{ goodsData.desc }}</el-col>
        <!-- <el-col :span="4"> </el-col> -->
        <el-col :span="20" :offset="4" class="btns">
          <router-link class="btn" :to="{ path : '/goods_update', query:{ id: goodsId }}"><el-button type="primary">修改</el-button></router-link>
          <el-button @click="back">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      goodsId:'',
      goodsData:{
        category: "", //商品类型
        name: "", //商品名称
        image: "", //商品图片
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
    back(){
      this.$router.go(-1)
    },
  },
  mounted(){
    this.$store.state.nav = [
      { name: "商品管理", path: "/goods" },
      { name: "商品详情", path: null }
    ];
    this.goodsId = this.$route.query.id;
    // 获取要修改的商品信息
    this.$http.get(`/api/goods/goods_details?id=${ this.goodsId }`).then(data=>{
      this.goodsData = data.data.data;
    })
  }
};
</script>
<style scoped>
  .clearfix{ font-size: 18px; }
  .el-col{ line-height: 2.4; color: #999; }
  .el-col-4{ color: #666; letter-spacing: 2px; }
  .el-col img{ width: 150px; height: 150px; }
  .btns{ margin-top: 30px; margin-bottom: 10px; }
  .btns a{ margin-right: 20px; }
</style>