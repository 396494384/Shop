<template>
  <div class="goods">
    <div class="search">
      <label>
        <input type="text" placeholder="请输入搜索商品名" v-model="sendData.name" />
      </label>
      <span>
        <i class="empty_btn" @click="empty">清空</i>
        <i class="search_btn" @click="search">搜索</i>
      </span>
    </div>
    <div class="sort">
      <div>
        <span @click="showSort(1)">{{ showText }}</span>
        <ul v-show="show == 1">
          <li :class="{ 'active': sendData.category == '' }" @click="selected('')">全部</li>
          <li v-for="(item, index) in categorys" :key="index" :class="{ 'active': sendData.category == item._id }" @click="selected(item._id)">{{ item.name }}</li>
        </ul>
      </div>
      <div @click="showSort(2)">
        <span><i>销量排序</i></span>
        <ul v-show="show == 2">
          <li :class="{ 'active': sendData.sortSalesVolume == -1 }" @click="sortSalesVolume(-1)">从高到低</li>
          <li :class="{ 'active': sendData.sortSalesVolume == 1 }" @click="sortSalesVolume(1)">从低到高</li>
        </ul>
      </div>
      <div @click="showSort(3)">
        <span><i>价格排序</i></span>
        <ul v-show="show == 3">
          <li :class="{ 'active': sendData.sortPrice == -1 }" @click="sortPrice(-1)">从高到低</li>
          <li :class="{ 'active': sendData.sortPrice == 1 }" @click="sortPrice(1)">从低到高</li>
        </ul>
      </div>
    </div>
    <list :goods='goods'></list>
  </div>
</template>
<script>
import list from '../components/list'
import { Toast } from 'mint-ui'
export default {
  name:'goods',
  components:{
    "list": list
  },
  data(){
    return {
      goods:[],
      show: 0,
      showText:"全部",
      categorys:[],
      sendData:{
        name:"", //搜索商品名
        category:"", //分类
        sellType: "", //售卖类型 1:普通商品 , 2:热门商品, 3:最新上架
        page: 1, //分页
        sortPrice: 0, //价格排序 0 - 不排序， -1 - 从高到低，  1 - 从低到高
        sortSalesVolume: 0 //销量排序 0 - 不排序， -1 - 从高到低，  1 - 从低到高
      }
    }
  },
  methods:{
    // 清空搜索
    empty(){
      if(this.sendData.name == ""){
        return;
      }
      this.sendData.name = "";
      this.sendData.category = "";
      this.sendData.sellType = "";
      this.sendData.page = 1;
      this.showText = "全部";
      this.sendData.sortPrice = 0;
      this.sendData.sortSalesVolume = 0;
      this.show = false
      this.getDoods();
    },
    // 搜索
    search(){
      if(this.sendData.name == ''){
        Toast({
          message:"请输入商品名",
          duration: 1000
        })
      }else{
        this.sendData.category = "";
        this.sendData.sellType = "";
        this.sendData.page = 1;
        this.showText = "全部";
        this.sendData.sortPrice = 0;
        this.sendData.sortSalesVolume = 0;
        this.show = false
        this.getDoods();
      }
    },
    showSort(idx){
      if(idx == this.show){
        this.show = 0
      }else{
        this.show = idx
      }
    },
    selected(id){
      this.show = false;
      if(id == this.sendData.category){
        return
      }else{
        if(id == ""){
          this.showText = "全部"
        }else{
          this.showText = this.categorys.filter(item=>{ return item._id == id })[0].name
        }
        this.sendData.category = id;
        this.sendData.page = 1;
        this.getDoods();
      }
    },
    // 销量排序
    sortSalesVolume(val){
      if(this.sendData.sortSalesVolume != val){
        this.sendData.sortSalesVolume = val;
        this.getDoods()
      }
    },
    // 价格排序
    sortPrice(val){
      if(this.sendData.sortPrice != val){
        this.sendData.sortPrice = val;
        this.getDoods()
      }
    },
    //获取商品列表
    getDoods(){
      this.$http.post('/api/goods/get_goods', this.sendData).then(data=>{
        this.goods = data.data.data;
      })
    }
  },
  mounted(){
    let _sellType = this.$route.query.type || "";
    this.sendData.sellType = _sellType;
    if(this.sendData.sellType != ""){
      this.$store.state.pageTitle = _sellType == 1 ? "普通商品" : _sellType == 2 ? "热门商品" : _sellType == 3 ? "最新上架" : "";
      this.$store.state.showFootBar = false;
    }else{
      this.$store.state.pageTitle = '商品列表';
      this.$store.state.showFootBar = true;
    }
    // 获取全部分类
    this.$http.get('/api/categorys/all').then(data=>{
      this.categorys = data.data.data;
    })
    this.getDoods();
  }
}
</script>
<style scoped>
.search{ height: 0.68rem; padding: 0.3rem; background-color: #fff; }
.search label{ float: left; width: 3.3rem; height: 100%; background: #f5f5f5 url(../assets/images/icon_search.png) no-repeat 0.15rem center ; background-size: 0.36rem 0.36rem; padding-left: 0.65rem; border-radius: 0.1rem; }
.search label input{ display: block; width: 95%; height: 100%; border: none; background: #f5f5f5; color: #999; }
.search span{ float: right; height: 100%; font-size: 0; }
.search span i{ display: inline-block; width: 1.2rem; height: 100%; line-height: 0.68rem; text-align: center; margin-left: 0.1rem; font-size: 0.28rem; border-radius: 0.1rem; }
.search span i.empty_btn{ margin-left: 0; color: #999; background-color: #f5f5f5; }
.search span i.search_btn{ color: #fff; background-color: #FF6867; }
.sort{ height: 0.78rem; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }
.sort div{ float: left; width: 2.5rem; height: 100%; text-align: center; color: #666; position: relative; }
.sort div:after{ content: ""; position: absolute; right: 0; top: 50%; width: 1px; height: 0.3rem; background-color: #ddd; margin-top: -0.15rem; }
.sort div:last-child:after{ display: none; }
.sort div span{ display: block; width: 100%; height: 100%; line-height: 0.78rem;  }
.sort div span i{ display: inline-block; padding-right: 0.35rem; background: url(../assets/images/icon_sort.png) no-repeat right center; background-size: 0.3rem 0.3rem; }
.sort div ul{ position: absolute; top: 0.78rem; left: 0; right: 0; background: #fff; }
.sort div li{ margin: 0 0.2rem; line-height: 0.66rem; font-size: 0.24rem; color: #999; border-bottom: 1px solid #eee; }
.sort div li.active{ color: #FF6867; }
.sort div li:last-child{ border-bottom: none; }
</style>