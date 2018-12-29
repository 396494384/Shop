<template>
  <div class="login">
    <el-form label-position="top">
      <h4 class="text-center">请登录</h4>
      <el-form-item label="名称">
        <el-input v-model="name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>
<script>
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
        this.showMsg('请输入用户名')
      } else if (this.password == "") {
        this.showMsg('请输入密码')
      } else {
        this.$http.post('/api/admin/login', {
          name: this.name,
          password: this.password
        }).then(data=>{
          if(data.data.code == 200){
            this.showMsg(data.data.message, 'success')
            setTimeout(()=>{
              this.$store.state.isLogin = true
              this.$store.state.admin = data.data.data.name
              sessionStorage.setItem('isLogin', true);
              sessionStorage.setItem('admin', data.data.data.name);
              this.$router.push({path: '/'});
            },1000)
          }else{
            this.showMsg(data.data.message)
            this.$store.state.isLogin = false;
          }
        })
      }
    },
    showMsg(str, type = "error") {
      this.$message({
        duration: 1000,
        message: str,
        type: type
      });
    }
  }
};
</script>
<style>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg.jpg);
  background-size: cover;
}
.login form {
  width: 250px;
  height: 280px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px 1px #999;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.login form h4 {
  margin: 10px 0 20px;
  padding: 0 0 20px;
  border-bottom: 1px solid #eee;
  color: #409eff;
  font-weight: bold;
}
.login form label {
  line-height: 1;
}
.login form button {
  display: block;
  width: 100%;
  margin: 0 auto;
}
</style>
