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
        <span @click="showMenu">{{ showText }}</span>
        <ul v-show="show">
          <li :class="{ 'active': sendData.category == '' }" @click="selected('')">全部</li>
          <li v-for="(item, index) in categorys" :key="index" :class="{ 'active': sendData.category == item._id }" @click="selected(item._id)">{{ item.name }}</li>
        </ul>
      </div>
      <div>
        <span>销量排序</span>
      </div>
      <div>
        <span>价格排序</span>
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
      show: false,
      showText:"全部",
      categorys:[],
      sendData:{
        name:"",
        category:"",
        page: 1
      }
    }
  },
  methods:{
    // 清空
    empty(){
      if(this.sendData.name == ""){
        return;
      }
      this.sendData.category = ""
      this.sendData.page = 1
      this.sendData.name = ""
      this.showText = "全部"
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
        this.sendData.category = ""
        this.sendData.page = 1
        this.showText = "全部"
        this.show = false
        this.getDoods();
      }
    },
    showMenu(){
      this.show = !this.show
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
    getDoods(){
      this.$http.post('/api/goods/get_goods', this.sendData).then(data=>{
        this.goods = data.data.data;
      })
    }
  },
  created(){
    this.$store.state.pageTitle = '商品列表';
    this.$store.state.showFootBar = true;
  },
  mounted(){
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
.sort div ul{ position: absolute; top: 0.78rem; left: 0; right: 0; background: #fff; }
.sort div li{ margin: 0 0.2rem; line-height: 0.66rem; font-size: 0.24rem; color: #999; border-bottom: 1px solid #eee; }
.sort div li.active{ color: #FF6867; }
.sort div li:last-child{ border-bottom: none; }
</style>