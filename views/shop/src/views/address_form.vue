<template>
  <div class="address_form">
    <ul>
      <li>
        <span>收货人</span>
        <input type="text" placeholder="请输入收货人的姓名" v-model="name">
      </li>
      <li>
        <span>手机号码</span>
        <input type="number" placeholder="请输入收货人的手机号码" v-model="phone">
      </li>
      <li>
        <span>详细地址</span>
        <input type="text" placeholder="请输入详细地址" v-model="site">
      </li>
      <li>
        <span>设置默认</span>
        <p class="state"><mt-switch v-model="state"></mt-switch></p>
      </li>
    </ul>
    <span class="confirm" @click="confirm">保存</span>
  </div>
</template>
<script>
import { Toast, Switch } from "mint-ui";
export default {
  name: "address_form",
  data() {
    return {
      id:"",
      name: "",
      phone: "",
      site: "",
      state: false
    };
  },
  methods: {
    confirm() {
      if (this.name == "") {
        this.showToast("请输入收货人的姓名");
      } else if (this.phone == "") {
        this.showToast("请输入收货人的手机号码");
      } else if (this.site == "") {
        this.showToast("请输入详细地址");
      } else {
        this.$http.post('/api/address/confirm',{
          id: this.id,
          name: this.name,
          phone: this.phone,
          site: this.site,
          state: this.state
        }).then(data=>{
          this.showToast(data.data.message);
          setTimeout(()=>{
            this.$router.go(-1)
          },1000)
        })
      }
    },
    showToast(str) {
      Toast({
        message: str,
        duration: 1000
      });
    }
  },
  created() {
    this.$store.state.pageTitle = "编辑收货地址";
    this.$store.state.showFootBar = false;
  },
  mounted(){
    this.id = this.$route.query.id || ""
    if(this.id){
      this.$http.get(`/api/address/get_address?id=${this.id}`).then(data=>{
        let _date = data.data.data
        if(data.data.code == 200){
          this.name = _date.name
          this.phone = _date.phone
          this.site = _date.site
          this.state = _date.state
        }
      })
    }
  }
};
</script>
<style scoped>
ul {
  display: block;
  background-color: #fff;
  padding: 0 0.3rem;
}
ul li {
  height: 0.98rem;
  border-bottom: 1px solid #eee;
  line-height: 0.98rem;
}
ul li span {
  float: left;
  width: 1.4rem;
}
ul li input {
  float: left;
  width: 5.5rem;
  height: 0.98rem;
  line-height: 0.98rem;
  color: #666;
  border: none;
}
ul li .state {
  float: left;
  width: 5.5rem;
  height: 0.98rem;
  color: #999;
  position: relative;
}
ul li .state label{ position: absolute; top: 50%; left: 0; margin-top: -16px; }
.confirm {
  display: block;
  width: 6.9rem;
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: #ff6767;
  color: #fff;
  font-size: 0.32rem;
  border-radius: 0.88rem;
  text-align: center;
  margin: 1rem auto;
}
</style>
