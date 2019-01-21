<template>
  <div class="my">
    <div class="my_top">
      <img src="../assets/images/my/bg_my_top.jpg" class="bg" />
      <div class="user">
        <img v-if="src" :src="src">
        <span>{{ name }}</span>
      </div>
      <div class="set">
        <img src="../assets/images/icon_set.png" @click="showSet = !showSet" />
        <ul v-show="showSet" @click="showSet = false">
          <li @click="showReviseType = 1">更换头像</li>
          <li @click="showReviseType = 2">修改用户名</li>
          <li @click="showReviseType = 3">修改密码</li>
        </ul>
      </div>
      <div class="revise_box" v-if="showReviseType != 0">
        <div class="revise_photo" v-show="showReviseType == 1">
          <label>
            <input id="image" name="file" type="file" @change="getImage($event)" ref="photo" />
            <img :src="newSrc" />
            选择要上传的头像
          </label>
          <div class="btns">
            <span class="confirm" @click="revisePhoto">确定</span>
            <span class="cancel" @click="reviseCancel">取消</span>
          </div>
        </div>
        <div class="revise_name" v-show="showReviseType == 2">
          <input type="text" placeholder="请输入新的用户名" v-model="newName" />
          <div class="btns">
            <span class="confirm" @click="reviseName">确定</span>
            <span class="cancel" @click="reviseCancel">取消</span>
          </div>
        </div>
        <div class="revise_password" v-show="showReviseType == 3">
          <label>
            请输入原密码
            <input type="password" placeholder="请输入原密码" v-model="password" />
          </label>
          <label>
            请输入新密码
            <input type="password" placeholder="请输入新密码" v-model="newPassword" />
          </label>
          <label>
            请再次输入新密码
            <input type="password" placeholder="请再次输入新密码"  v-model="newRepassword"/>
          </label>
          <div class="btns">
            <span class="confirm" @click="revisePassword">确定</span>
            <span class="cancel" @click="reviseCancel">取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order_links">
      <dl>
        <dt>
          <strong>我的订单</strong>
          <router-link :to="{ path : '/my' }">
            <span>查看全部订单</span>
            <img src="../assets/images/my/icon_right2.png" />
          </router-link>
        </dt>
        <dd>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl1.png" />
            <span>待付款</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl2.png" />
            <span>待发货</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl3.png" />
            <span>待收货</span>
            <!-- <span class="circle">1</span> -->
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl4.png" />
            <span>已完成</span>
          </router-link>
          <router-link :to="{ path : '/my' }">
            <img src="../assets/images/my/icon_wl5.png" />
            <span>退款/售后</span>
          </router-link>
        </dd>
      </dl>
    </div>
    <div class="more_links">
      <ul>
        <li>
          <router-link :to="{ path : '/address' }">
            <span>
              <img src="../assets/images/my/icon_my1.png" />
              <span>收货地址</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/record' }">
            <span>
              <img src="../assets/images/my/icon_my2.png">
              <span>浏览记录</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/collections' }">
            <span>
              <img src="../assets/images/my/icon_my3.png">
              <span>我的收藏</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ path : '/' }">
            <span>
              <img src="../assets/images/my/icon_my4.png">
              <span>在线客服</span>
            </span>
            <img class="icon_right" src="../assets/images/my/icon_right.png">
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : '/' }">
            <span>
              <img src='../assets/images/my/icon_my5.png'>
              <span>联系我们</span>
            </span>
            <img class='icon_right' src='../assets/images/my/icon_right.png'>
          </router-link>
        </li> -->
      </ul>
    </div>
    <span class="logout" @click="logout">退出登录</span>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: "my",
  data() {
    return {
      showSet: false,
      name:null,
      src: "",
      showReviseType: 0,
      newSrc: "",
      newName: "",
      password: "",
      newPassword: "",
      newRepassword: ""
    };
  },
  methods:{
    getImage(e){
      let _file = e.target.files[0];
      let _reader = new FileReader();
      let _that = this;
      _reader.readAsDataURL(_file);
      _reader.onload = function(e) {
        _that.newSrc = this.result;
      };
    },
    // 修改头像
    revisePhoto(){
      if(this.src == this.newSrc){
        return
      }else{
        let _formData = new FormData();
        _formData.append("file", this.$refs.photo.files[0]);
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
          this.$http.post("/api/user/revise_photo", {
            photo: data.data.data
          }).then(data => {
            Toast({
              message: data.data.message,
              duration: 1000
            })
            if(data.data.code == 200){
              setTimeout(()=>{
                this.src = data.data.data;
                this.showReviseType = 0;
              }, 1000)
            }
          });
        })
      }
    },
    // 修改用户名
    reviseName(){
      if(this.newName == ""){
        Toast({
          message: "请输入新的用户名",
          duration: 1000
        })
      }else if(this.newName == this.name){
        return;
      }else{
        this.$http.post('/api/user/revise_name', { name: this.newName }).then(data=>{
          Toast({
            message: data.data.message,
            duration: 1000
          })
          if(data.data.code == 200){
            setTimeout(()=>{
              this.name = this.newName;
              this.showReviseType = 0;
            }, 1000)
          }
        })
      }
    },
    // 修改密码
    revisePassword(){
      if(this.password == ""){
        Toast({
          message: "请输入原密码",
          duration: 1000
        })
      }else if(this.newPassword == ""){
        Toast({
          message: "请输入新密码",
          duration: 1000
        })
      }else if(this.newRepassword == ""){
        Toast({
          message: "请再次输入新密码",
          duration: 1000
        })
      }else if(this.newPassword != this.newRepassword){
        Toast({
          message: "两次密码输入不一致",
          duration: 1000
        })
      }else{
        this.$http.post('/api/user/revise_password', {
          password: this.password,
          newPassword: this.newPassword
        }).then(data=>{
          Toast({
            message: data.data.message,
            duration: 1000
          })
          if(data.data.code == 200){
            setTimeout(()=>{
              this.$store.state.isLogin = false;
              this.$router.push({ path : '/login' })
              this.showReviseType = 0;
            }, 1000)
          }
        })
      }
    },
    reviseCancel(){
      this.showReviseType = 0
    },
    // 退出当前登录
    logout(){
      this.$http.get('/api/user/logout').then(data=>{
        if(data.data.code == 200){
          Toast({
            message: data.data.message,
            duration: 1000
          })
          setTimeout(()=>{
            this.$store.state.isLogin = false;
            this.$router.push({ path : '/' })
          },1000)
        }
      })
    },
  },
  created() {
    this.$store.state.pageTitle = "我的";
    this.$store.state.showFootBar = true;
  },
  mounted(){
    // 获取用户信息
    this.$http.get('/api/user/user_info').then(data=>{
      if(data.data.code == 200){
        this.newSrc = this.src = data.data.data.photo;
        this.name = data.data.data.name;
      }
    })
  }
};
</script>
<style scoped>
.my_top{ width: 100%; height: 3rem; position: relative; }
.my_top .bg, .my_top .user{ width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
.my_top .user img{ display: block; width: 1.52rem; height: 1.52rem; border-radius: 50%; border: 4px solid #fff; margin: 0 auto 0.2rem; }
.my_top .user span{ display: block; text-align: center; color: #fff; font-size: 0.3rem; }
.my_top .set{ position: absolute; top: 0; right: 0.3rem; width: 0.4rem; height: 0.4rem; }
.my_top .set img{ display: block; width: 0.4rem; height: 0.4rem; }
.my_top .set ul{ position: absolute; top: 0.6rem; right: -0.1rem; width: 1.2rem; background-color: rgba(255,255,255,0.7); color: #999; padding: 0.1rem 0.2rem; text-align: right; border-radius: 0.1rem; }
.my_top .set ul:after{ content:""; width: 0; height: 0; border: 5px solid transparent; border-bottom-color:rgba(255,255,255,0.7); position: absolute; top: -10px; right: 10px; }
.my_top .set ul li{ line-height: 2; font-size: 0.24rem; }
.order_links{ width: 6.9rem; height: 1.97rem; margin: 0 auto; position: relative; }
.order_links dl{ width: 100%; height: 2.5rem; position: absolute; left: 0; bottom: 0; background-color: #fff; border-radius: 0.2rem; }
.order_links dt{ height: 0.86rem; padding: 0 0.3rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; align-content: center; }
.order_links dt strong{ font-size: 0.3rem; font-weight: bold; }
.order_links dt a{ display: flex; justify-content: flex-end; align-items: center; align-content: center; }
.order_links dt a span{ font-size: 0.26rem; color: #A0A0A0; }
.order_links dt a img{ width: 0.12rem; height: 0.22rem; margin-left: 0.16rem; }
.order_links dd{ width: 100%; height: 1.6rem; padding: 0 0.1rem; box-sizing: border-box; display: flex; flex-direction: row; }
.order_links dd a{position: relative; width: 1.34rem; height: 100%; display: flex; justify-content: center; align-items: center; align-content: center; flex-wrap: wrap; }
.order_links dd img{ width: 0.55rem; height: 0.49rem; }
.order_links dd span{ width: 100%; margin-top: 0.2rem; text-align: center; font-size: 0.24rem; }
.more_links{ padding: 0.3rem; }
.order_links dd a .circle{position: absolute;top: 0.4rem;right: 0.28rem;width: 0.28rem;height: 0.28rem;background: #FF6767;color: #fff;border-radius: 50%;line-height: 0.28rem;font-size: 0.18rem;font-family: Arial, Helvetica, sans-serif;}
.more_links .icon_right{ width: 0.13rem; height: 0.24rem; }
.more_links ul{ display: block; background-color: #fff; padding: 0.1rem 0; border-radius: 0.2rem; }
.more_links li{ display: block; height: 0.94rem; margin: 0 0.30rem; border-bottom: 1px solid #F0F0F0;  }
.more_links ul li:last-child{ border-bottom: none; }
.more_links a, .more_links label{ width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center; align-content: center; }
.more_links span{ height: 100%; display: flex; flex-direction: row; align-content: center; align-items: center; }
.more_links span img{ width: 0.40rem; height: 0.35rem; margin-right: 0.14rem; }
.logout{ display: block; margin: 0 0.3rem 0.4rem; text-align: center; color: #fff; line-height: 0.88rem; background-color: #FF6767; border-radius: 0.1rem; font-size: 0.28rem; }

.revise_box{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1; }
.revise_photo, .revise_name, .revise_password{ width: 3rem; background-color: #fff; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; padding: 0.3rem; border-radius: 0.2rem; }
.revise_photo{ width: 4.3rem; height: 3.3rem;  }
.revise_photo label{ display: block; text-align: center; color: #999; }
.revise_photo input{ display: none; }
.revise_photo img{  display: block; width: 1.52rem; height: 1.52rem; border-radius: 50%; border: 4px solid #fff; margin: 0 auto 0.2rem; }
.revise_name{ width: 4.3rem; height: 1.7rem; }
.revise_name input{ display: block; width: 100%; height: 0.76rem; line-height: 0.76rem; border: 1px solid #ddd; box-sizing: border-box; padding-left: 0.2rem; color: #999; }
.revise_password{ width: 4.3rem; height: 5.3rem; }
.revise_password label{ display: block; color: #666; margin-bottom: 0.3rem; }
.revise_password label input{ display: block; width: 100%; height: 0.76rem; line-height: 0.76rem; border: 1px solid #ddd; box-sizing: border-box; padding-left: 0.2rem; color: #999; margin-top: 0.2rem; }
.revise_box .btns{ margin: 0.3rem auto 0; font-size: 0; }
.revise_box .btns span{ display: inline-block; width: 2rem; height: 0.66rem; line-height: 0.66rem;  text-align: center;  font-size: 0.28rem; }
.revise_box .btns span.confirm{ background-color: #FF6767; color: #fff; }
.revise_box .btns span.cancel{ background-color: #ddd; color: #666; margin-left: 0.3rem; }
</style>