<template>
  <div class="register">
    <form>
      <label class="photo">
        <input id="image" name="file" type="file" @change="getImage($event)" ref="image">
        <p>
          <img v-if="src == ''" src="../assets/images/img_photo.png" />
          <img v-else :src="src" />
        </p>
        <span>上传用户头像</span>
      </label>
      <label>
        请输入用户名
        <input type="text" placeholder="请输入用户名" v-model="name">
      </label>
      <label>
        请输入密码
        <input type="password" placeholder="请输入密码" v-model="password">
      </label>
      <label>
        请再次输入密码
        <input type="password" placeholder="请再次输入密码" v-model="repassword">
      </label>
      <span class="register_btn" @click="register">注册</span>
      <p class="to_register">已有账号，
        <router-link :to="{ path: '/login' }">去登录</router-link>
      </p>
    </form>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "register",
  data() {
    return {
      name: "",
      password: "",
      repassword: "",
      src:""
    };
  },
  methods: {
    getImage(e) {
      let _file = e.target.files[0];
      let _reader = new FileReader();
      let _that = this;
      _reader.readAsDataURL(_file);
      _reader.onload = function(e) {
        _that.src = this.result;
      };
    },
    register() {
      if(this.src == ""){
        this.showToast("请上传用户头像");
      } else if (this.name == "") {
        this.showToast("请输入用户名");
      } else if (this.password == "") {
        this.showToast("请输入密码");
      } else if (this.repassword == "") {
        this.showToast("请再次输入密码");
      } else if (this.repassword != this.password) {
        this.showToast("两次密码不一致");
      } else {
        // 上传图片
        let _formData = new FormData();
        _formData.append("file", this.$refs.image.files[0]);
        this.$http({
          method: "post",
          url: "api/user/upload",            
          anync: true,
          contentType: false,
          processData: false,
          data: _formData
        }).then(data => {
          if (data.data.code == 200) {
            return data;
          } else {
            this.showMsg("图片上传失败", "error");
          }
        }).then(data=>{
          this.$http.post("/api/user/register", {
            photo: data.data.data,
            name: this.name,
            password: this.password
          }).then(data => {
            this.showToast(data.data.message);
            if(data.data.code == 200){
              setTimeout(()=>{
                this.$router.push({ path: '/login' })
              },1000)
            }
          });
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
    this.$store.state.pageTitle = "注册";
    this.$store.state.showFootBar = false;
  }
};
</script>
<style scoped>
.register .photo input{ width: 0; height: 0; display: none; }
.register .photo p{ display: block; width: 1.2rem; height: 1.2rem; border-radius: 50%; overflow: hidden; margin: 0 auto 0.2rem; }
.register .photo img{ display: block; width: 100%; height: 100%; }
.register .photo span{ display: block; text-align: center; color: #999; font-size: 0.24rem; }


.register form {
  margin: 0.8rem;
  background-color: #fff;
  padding: 0.4rem;
  box-sizing: border-box;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px 1px #ddd;
}
.register form label {
  display: block;
  font-size: 0.3rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.register form label input {
  display: block;
  width: 100%;
  height: 0.76rem;
  line-height: 0.76rem;
  border: none;
  background-color: #f5f5f5;
  border-radius: 0.08rem;
  margin-top: 0.3rem;
  color: #999;
  padding: 0 0.2rem;
  box-sizing: border-box;
  outline: none;
}
.register .register_btn {
  display: block;
  width: 100%;
  height: 0.76rem;
  line-height: 0.76rem;
  text-align: center;
  color: #fff;
  background-color: #FF6867;
  border-radius: 0.1rem;
  font-size: 0.32rem;
}
.to_register {
  text-align: right;
  margin-top: 0.4rem;
  color: #999;
}
.to_register a {
  color: #FF6867;
}
</style>