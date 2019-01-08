<template>
  <div class="address">
    <ul>
      <li class="item" v-for="(item, index) in address" :key="index">
        <p class="consignee">
          <span>收货人：{{ item.name }}</span>
          <i>{{ item.phone }}</i>
        </p>
        <p class="site">{{ item.site }}</p>
        <div class="operation">
          <div class="default" :class="{ 'selected' : item.state }" @click="setDefault(item._id)">默认地址</div>
          <div class="right">
            <router-link :to="{ path : '/address_form', query: { id : item._id } }">编辑</router-link>
            <span @click="remove(item._id)">删除</span>
          </div>
        </div>
      </li>
    </ul>
    <router-link class="append" :to="{ path : '/address_form' }">
      <img src='../assets/images/icon_add.png' />
      <span>新增地址</span>
    </router-link>
  </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
export default {
  name:'address',
  data(){
    return {
      address:[]
    }
  },
  methods:{
    setDefault(id){
      let state = this.address.filter(item => item._id == id)[0].state
      if(state){ return }
      this.$http.get(`/api/address/set_default?id=${id}`).then(data=>{
        Toast({
          message: data.data.message,
          duration: 1000
        })
        if(data.data.code == 200){
          this.address = data.data.data;
        }
      })
    },
    remove(id){
      MessageBox.confirm('确定要删除当前收货地址?').then(action => {
        this.$http.get(`/api/address/remove?id=${id}`).then(data=>{
          Toast({
            message: data.data.message,
            duration: 1000
          })
          if(data.data.code == 200){
            this.address = this.address.filter(item => item._id != id);
          }
        })
      }).catch((action)=>{});
      
    }
  },
  created(){
    this.$store.state.pageTitle = "收货地址";
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.$http.get('/api/address/all').then(data=>{
      if(data.data.code == 200){
        this.address = data.data.data
      }
    })
  }
}
</script>
<style scoped>
.item{ background-color: #fff; margin-bottom: 0.3rem; padding: 0.3rem; }
.item .consignee{ overflow: hidden; font-size: 0.28rem; color: #666; }
.item .consignee span{ float: left; }
.item .consignee i{ float: right; }
.item .site{ padding: 0.2rem 0; line-height: 1.6; border-bottom: 1px solid #ddd; color: #666; }
.item .operation{ padding: 0.3rem 0 0; overflow: hidden; }
.item .operation .default{ float: left; padding-left: 0.5rem; line-height: 0.4rem; background: url(../assets/images/icon_check1.png) no-repeat left center; background-size: 0.4rem 0.4rem; font-size: 0.24rem; color: #999; }
.item .operation .default.selected{ color: #FF6767; background: url(../assets/images/icon_check2.png) no-repeat left center; background-size: 0.4rem 0.4rem; }
.item .operation .right{ float: right; font-size: 0; }
.item .operation .right a, .item .operation .right span{ display: inline-block; font-size: 0.24rem; color: #999; line-height: 0.4rem; padding-left: 0.45rem; }
.item .operation .right a{ background: url(../assets/images/icon_redact.png) no-repeat left center; background-size: 0.34rem 0.34rem; }
.item .operation .right span{ background: url(../assets/images/icon_del2.png) no-repeat left center; background-size: 0.34rem 0.34rem; margin-left: 0.3rem; }
.append{ display: block; width: 6.9rem; height: 0.8rem; line-height: 0.8rem; margin: 1rem auto 0; background-color: #FF6767; color: #fff; font-size: 0.36rem; border-radius: 0.8rem; text-align: center; }
.append img{ width: 0.38rem; height: 0.38rem; margin-right: 0.15rem; vertical-align: middle; margin-top: -3px; }
</style>
