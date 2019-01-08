<template>
  <div class="car">
    <ul>
      <li v-for="(item, index) in cars" :key="index" :class="{ 'show_del' : item.goods.showDel }" ref="item" @touchstart="touchstart" @touchend="touchend" :data-id="item.goods._id">
        <label @click="check(item.goods._id)">
          <img v-if="!item.goods.check" src="../assets/images/icon_check1.png" />
          <img v-else src="../assets/images/icon_check2.png" />
        </label>
        <div>
          <router-link class="img" :to="{ path : '/goods_details', query : { id : item.goods._id } }"><img :src="item.goods.image" /></router-link>
          <span class="info">
            <router-link :to="{ path : '/goods_details', query : { id : item.goods._id } }">
              <strong>{{ item.goods.name }}</strong>
              <i class="price">
                价格: {{ item.goods.saleState ? item.goods.salePrice : item.goods.price | money }} <b v-if="item.goods.saleState">价格: {{ item.goods.price | money }}</b>
              </i>
            </router-link>
            <span class="count">
              <i>库存: {{ item.goods.count }}</i>
              <b>
                <em class="minus">-</em>{{ item.count }}<em class="add">+</em>
              </b>
            </span>
          </span>
        </div>
        <span class="del" @click.prevent="delCar">
          <img src="../assets/images/icon_del.png" />
        </span>
      </li>
    </ul>
    <div class="car_bottom">
      <i @click="checkAll">{{ checkState ? '取消全选' : '全选' }}</i>
      <b>去支付</b>
      <span>总价: {{ total | money }}</span>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
export default {
  name:'car',
  data(){
    return {
      cars:null,
      total:0,
      checkState: false,
      moveStart:0,
      moveEnd:0,
      delId:""
    }
  },
  methods:{
    //计算总价
    calculation(){ 
      this.total = 0;
      this.cars.forEach(i=>{
        if(i.goods.check){
          this.total += i.goods.saleState ? i.goods.salePrice * i.count : i.goods.price * i.count
        }
      })
    },
    // 判断是否全部都选中
    judgeCheck(){
      let number = 0;
      this.cars.forEach(i=>{
        if(i.goods.check){
          number++;
        }else{
          this.checkState = false
        }
      })
      if(this.cars.length == number){
        this.checkState = true
      }
    },
    // 单项选择
    check(id){
      let cars = this.cars;
      cars.forEach(i=>{
        if(i.goods._id == id){
          i.goods.check = !i.goods.check
        }
      })
      this.cars = cars
      this.calculation()
      this.judgeCheck()
    },
    checkAll(){
      let cars = this.cars;
      this.checkState = !this.checkState;
      cars.forEach(i=>{
        i.goods.check = this.checkState
      })
      this.cars = cars
      this.calculation()
    },
    //获取触摸坐标
    touchstart(e){
      this.moveStart = e.changedTouches[0].pageX
      e.path.forEach(i=>{
        try{
          if(i.dataset.id){
            this.delId = i.dataset.id
          }
        }catch(err){
          // throw err
        }
      })
    },
    // 根据左右移动，显示/隐藏删除按钮
    touchend(e){
      let _cars = this.cars
      this.moveEnd = e.changedTouches[0].pageX
      _cars.forEach(i=>{
        if(i.goods._id == this.delId) {
          if(this.moveStart > this.moveEnd && this.moveStart - this.moveEnd > 50){ //向左
            i.goods.showDel = true
          }else if(this.moveStart < this.moveEnd && this.moveEnd - this.moveStart > 50){ //向右
            i.goods.showDel = false
          }
        }
      })
      this.cars = _cars
    },
    //从购物车移除商品
    delCar(e){
      MessageBox.confirm('确定要删除当前商品?').then(action => {
        this.$http.post('/api/car/remove',{
          goodsid: this.delId
        }).then(data=>{
          Toast({
            message: data.data.message,
            duration: 1000
          })
          if(data.data.code == 200){
            this.cars = this.cars.filter(item => { return item.goods._id != this.delId })
            this.calculation()
          }
        })
      }).catch((action)=>{
        this.delId = null
      });
    }
  },
  created(){
    this.$store.state.pageTitle = '购物车';
    this.$store.state.showFootBar = true;
  },
  mounted(){
    this.$http.get('/api/car/cars').then(data=>{
      if(data.data.code == 200){
        data.data.data.forEach(i=>{
          i.goods.check = false
          i.goods.showDel = false
        })
        this.cars = data.data.data
        this.calculation()
      }else{
        Toast({
          message: data.data.message,
          duration: 1000
        })
      }
    })
  }
}
</script>
<style scoped>
  .car{ padding-bottom: 1.1rem; }
  .car ul{ overflow: hidden; }
  .car li{ width: 8.5rem; height: 2rem; margin-bottom: 0.3rem; padding: 0.2rem 0;  box-shadow: 0 0 10px 1px #ddd; background-color: #fff; position: relative; transition: all 0.3s; }
  .car li.show_del{ margin-left: -0.8rem; }
  .car li label{ float: left; width: 1rem; height: 100%; position: relative; }
  .car li label img{ width: 0.5rem; height: 0.5rem; position: absolute; top: 50%; left: 0.3rem; margin-top: -0.25rem; }
  .car li div{ float: left; height: 100%; }
  .car li div .img img{ float: left; width: 2rem; height: 2rem; box-shadow: 0 0 1px 1px #eee inset;  }
  .car li .info{ float: left; width: 3.9rem; height: 2rem; margin-left: 0.3rem; padding: 0.2rem 0; box-sizing: border-box;}
  .car .info strong{ display: block; font-size: 0.32rem; color: #666; line-height: 2; }
  .car .info .price{ display: block; font-size: 0.24rem; color: #FF6867; margin-bottom: 0.4rem; }
  .car .info .price b{ font-size: 0.2rem; color: #999; text-decoration: line-through; margin-left: 0.2rem; }
  .car .info .count { display: block; overflow: hidden; color: #999; }
  .car .info .count i{ font-size: 0.24rem; line-height: 0.4rem;  float: left; }
  .car .info .count b{ float: right; width: 1.5rem;  height: 0.4rem; line-height: 0.4rem; border: 1px solid #ddd; text-align: center; font-size: 0.24rem; }
  .car .info .count em{ width: 0.4rem; height: 100%; font-size: 0.28rem; }
  .car .info .count em.minus{ float: left; border-right: 1px solid #ddd; }
  .car .info .count em.add{ float: right; border-left: 1px solid #ddd; }
  .car li .del{ width: 1rem; height: 100%; position: absolute; right: 0; top: 0; border-left: 1px solid #eee; }
  .car li .del img{ width: 0.5rem; height: 0.5rem; position: absolute; top: 50%; right: 0.35rem; margin-top: -0.25rem; }
  .car_bottom{ padding:0.2rem 0.3rem; background-color: #fff; position: fixed; left: 0; right: 0; bottom: 1.08rem;  border-top: 1px solid #eee;  }
  .car_bottom i{ margin-right: 0.2rem; line-height: 0.66rem; font-size: 0.3rem; color: #666; letter-spacing: 1px; }
  .car_bottom span{ float: right; margin-right: 0.3rem; line-height: 0.66rem; color: #FF6867; font-size: 0.28rem; } 
  .car_bottom b{ float: right; width: 1.5rem; height: 0.66rem; line-height: 0.66rem; font-size: 0.24rem; color: #fff; background-color: #FF6867; text-align: center; border-radius: 0.66rem; }
</style>