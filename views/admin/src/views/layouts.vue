<template>
  <div class="layouts">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="21">
            <span class="logo">拼夕夕商品店</span>
          </el-col>
          <el-col :span="3">
            <el-dropdown trigger="click">
              <!-- <img src="/" class="photo"> -->
              <span class="el-dropdown-link">{{ this.$store.state.admin }}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="dialog = true">修改密码</span></el-dropdown-item>
                <el-dropdown-item><span @click="logout">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
        <el-dialog
          title="修改密码" :visible.sync="dialog" width="300px">
          <el-form>
            <el-form-item label="当前密码">
              <el-input placeholder="请输入当前密码" v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input placeholder="请输入新密码" v-model="newPassword"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码">
              <el-input placeholder="请再次输入新密码" v-model="newRepassword"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-header>
      <el-container>
        <leftmenu></leftmenu>
        <el-container v-loading="this.$store.state.loading" :element-loading-text="this.$store.state.loadingText" element-loading-background="rgba(255, 255, 255, 0.8)">
          <el-main>
            <breadnav :nav="this.$store.state.nav"></breadnav>
            <router-view/>
          </el-main>
          <el-footer>拼夕夕商品店</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import leftmenu from '../components/left_menu'
import breadnav from '../components/bread_nav'
export default {
  name: 'layouts',
  components:{
    "leftmenu": leftmenu,
    "breadnav": breadnav
  },
  data(){
    return {
      dialog: false,
      password:"",
      newPassword:"",
      newRepassword:""
    }
  },
  methods:{
    logout(){
      this.$http.get('/api/admin/logout').then(data=>{
        if(data.data.code == 200){
          this.showMsg(data.data.message, 'success')
          setTimeout(()=>{
            this.$store.state.isLogin = false
            this.$store.state.admin = ""
            sessionStorage.setItem('isLogin', false);
            sessionStorage.setItem('admin', "");
          },1000)
        }
      })
    },
    confirm(){
      if(this.password == ""){
        this.showMsg("请输入密码")
      }else if(this.newPassword == ""){
        this.showMsg("请输入新密码")
      }else if(this.newRepassword == ""){
        this.showMsg("请再次输入新密码")
      }else if(this.newPassword != this.newRepassword){
        this.showMsg("再次密码输入不一致")
      }else{
        this.$http.post('/api/admin/modify', {
          password: this.password,
          newPassword: this.newPassword,
          newRepassword: this.newRepassword
        }).then(data=>{
          let _type = data.data.code == 200 ? 'success' : 'error'
          this.showMsg(data.data.message, _type)
          if(data.data.code == 200){
            setTimeout(()=>{
              this.$store.state.isLogin = false
              this.$store.state.admin = ""
              sessionStorage.setItem('isLogin', false);
              sessionStorage.setItem('admin', "");
            },1000)
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
}
</script>
<style>
  .layouts{ height: 100%; }
  .el-dropdown-menu .el-dropdown-menu__item{ padding: 0; text-align: center; }
  .el-dropdown-menu .el-dropdown-menu__item span{ display: block; padding: 0 10px; border-bottom: 1px solid #eee; margin: 0 10px; }
  .layouts .el-form-item{ margin-bottom: 10px; }
  .layouts .el-dialog .el-dialog__body{ padding: 0 20px }
</style>

