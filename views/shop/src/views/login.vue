<template>
  <div class="login">
    <form>
      <label>
        请输入用户名
        <input type="text" placeholder="请输入用户名" v-model="name" />
      </label>
      <label>
        请输入密码
        <input type="password" placeholder="请输入密码" v-model="password" />
      </label>
      <span class="login_btn" @click="login">登录</span>
      <p class="to_register">还没有账号， <router-link :to="{ path: '/register' }">去注册</router-link></p>
    </form>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.name == "") {
        this.showToast("请输入用户名");
      } else if (this.password == "") {
        this.showToast("请输入密码");
      } else {
        this.$http.post("/api/user/login", {
          name: this.name,
          password: this.password
        }).then(data => {
          if(data.data.code == 200){
            this.$store.state.isLogin = true;
            setTimeout(()=>{
              this.$router.push({ path : '/' });
            },1000)
          }else{
            this.showToast(data.data.message);
          }
        });
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
    this.$store.state.pageTitle = "登录";
    this.$store.state.showFootBar = false;
  },
  mounted() {}
};
</script>
<style scoped>
.login form{ margin: 0.8rem; background-color: #fff; padding: 0.4rem; box-sizing: border-box; border-radius: 0.2rem; box-shadow: 0 0 10px 1px #ddd; }
.login form label{ display: block; font-size: 0.3rem; color: #666; margin-bottom: 0.5rem;  }
.login form label input{ display: block; width: 100%; height: 0.76rem; line-height: 0.76rem; border: none; background-color: #F5F5F5; border-radius: 0.08rem; margin-top: 0.3rem; color: #999; padding: 0 0.2rem; box-sizing: border-box; 
outline: none; }
.login .login_btn{ display: block; width: 100%; height: 0.76rem; line-height: 0.76rem; text-align: center; color: #fff; border: none; background-color: #FF6867; border-radius: 0.1rem; font-size: 0.32rem; }
.to_register{ text-align: right; margin-top: 0.4rem; color: #999; }
.to_register a{ color: #FF6867; }
</style>