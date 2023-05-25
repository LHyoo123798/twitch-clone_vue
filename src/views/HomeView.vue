<template>
  <el-container>
    <el-header style="height: 3.2rem">
      <div style="margin: -6px 0;height: 4rem;display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center">
          <a href="http://localhost:8080/" style="display: flex; align-items: center">
            <img src="../assets/twitch_logo.png" style="width: 34px;height: 36px">
          </a>
          <a href="http://localhost:8080/directory" style="display: flex; align-items: center;text-decoration: none; color: black;">
            <b style="margin-left: 10px">浏览</b>
          </a>
          <el-dropdown trigger="click" placement="bottom">
            <span class="el-dropdown-link" style="margin-left: 10px;height: 30px;width: 30px;cursor: pointer; display: flex; justify-content: center; align-items: center;">
              <i class="el-icon-more" style="transform: rotate(90deg);"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div @click="aboutDrawer ()"><el-dropdown-item>关于</el-dropdown-item></div>
              <div @click="developerDrawer ()"><el-dropdown-item>开发人员</el-dropdown-item></div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="height: 50px; width: 360px; display: flex; justify-content: center; align-items: center">
          <el-input style="height: 100%; width: 330px; margin: 0; display: flex; align-items: center;" placeholder="搜索"></el-input>
          <i class="el-icon-search" style="margin-left: 5px; font-size: 20px; font-weight: bold; line-height: 50px;"></i>
        </div>
        <div style="display: flex; align-items: center">
          <div  :style="{'display': showDiv ? 'block' : 'none'}">
            <el-button type="primary" @click = "loginForm()" size="small" style="border-radius: 5px; border-color:#dad5d5;background-color: #dad5d5;font-weight: bold;color:black">登录</el-button>
            <el-button type="success" @click = "registerForm()" size="small" style="border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;">注册</el-button>
          </div>
          <el-dropdown trigger="click" placement="bottom">
            <span class="el-dropdown-link" style="margin-left: 10px;height: 30px;width: 30px;cursor: pointer; display: flex; justify-content: center; align-items: center;">
              <i class="el-icon-user" style="font-size: 20px;font-weight: bold"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div @click = "informationForm()"><el-dropdown-item><i class="el-icon-s-home"></i>个人信息</el-dropdown-item></div>
              <div v-if="isLoggedIn" @click = "removelocalStorage()"><el-dropdown-item><i class="el-icon-error"></i>登出</el-dropdown-item></div>
              <div v-else @click = "loginForm()"><el-dropdown-item><i class="el-icon-success"></i>登录</el-dropdown-item></div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="sideWidth+'px'">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" :width="sideWidth+'px'">
          <el-menu-item>
            <span slot="title">推荐频道</span>
            <i :class="collapseBtnClass" @click="collapse"></i>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :carouselType="carouselType" />
      </el-main>
    </el-container>

    <el-dialog :visible.sync="loginFormVisible" width="40%" style="border-radius: 50px" custom-class="myLogin-dialog">
      <div class="el-dialog-div">
        <div slot="title" class="dialog-title">
          <img src="../assets/twitch_logo.png" style="width: 55px;height: 55px;margin-right: 10px">
          <span class="custom-title">登录Twitch</span>
        </div>
        <el-form label-width="80px" size="small" ref="userForm" :model="user" :rules="rules">
          <el-form-item label="邮箱" prop="email" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off"  v-model="user.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="display: flex; justify-content: center;">
            <el-button @click="login()" style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 10px;border-radius: 6px">登录</el-button>
          </div>
          <div style="display: flex; justify-content: center;">
            <el-button style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 20px;border-radius: 6px" @click="loginToregister">没有账户？注册</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="registerFormVisible" width="40%" style="border-radius: 50px" custom-class="myRegister-dialog">
      <div class="el-dialog-div">
        <div slot="title" class="dialog-title">
          <img src="../assets/twitch_logo.png" style="width: 55px;height: 55px;margin-right: 10px">
          <span class="custom-title">立即加入Twitch</span>
        </div>
        <el-form label-width="80px" size="small" ref="userForm" :model="user" :rules="rules">
          <el-form-item label="用户名" prop="username" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="user.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="display: flex; justify-content: center;">
            <el-button @click="register()" style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 10px;border-radius: 6px">注册</el-button>
          </div>
          <div style="display: flex; justify-content: center;">
            <el-button style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 20px;border-radius: 6px" @click="registerTologin">已有账户？登录</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="informationFormVisible" custom-class="myInformation-dialog">
      <el-descriptions title="个人信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="id" v-if="newUser && newUser.userId">{{newUser.userId}}</el-descriptions-item>
        <el-descriptions-item label="姓名" v-if="newUser && newUser.userName">{{newUser.userName}}</el-descriptions-item>
        <el-descriptions-item label="邮箱" v-if="newUser && newUser.email">{{newUser.email}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-drawer
      :title= "drawerTitle"
      :visible.sync="drawer"
      :direction="direction">
      <span style="font-size: x-large;color: #8D2EA9;margin-left: 20px">{{ drawerContent }}</span>
    </el-drawer>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data () {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      carouselType: 'card', // 默认值为card
      sideWidth: 65,
      collapseBtnClass: 'el-icon-s-unfold',
      isCollapse: true,
      loginFormVisible: false,
      registerFormVisible: false,
      input: '',
      informationFormVisible: false,
      userData: [],
      drawer: false,
      direction: 'ltr',
      drawerTitle: '',
      drawerContent: '',
      showDiv: true,
      newUser: null,
      isLoggedIn: false
      // newUser: JSON.parse(localStorage.getItem('user'))
    }
  },

  mounted () {
    this.newUser = JSON.parse(localStorage.getItem('user'))
    this.checkLocalStorage()
  },
  methods: {
    collapse () { // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (!this.isCollapse) { // 展开
        this.sideWidth = 235
        this.collapseBtnClass = 'el-icon-s-fold'
        this.carouselType = ''
      } else { // 收缩
        this.sideWidth = 65
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.carouselType = 'card'
      }
    },
    loginForm () {
      this.loginFormVisible = true
    },
    registerForm () {
      this.registerFormVisible = true
    },
    loginToregister () {
      this.loginFormVisible = false
      this.registerFormVisible = true
    },
    registerTologin () {
      this.registerFormVisible = false
      this.loginFormVisible = true
    },
    informationForm () {
      this.informationFormVisible = true
    },
    aboutDrawer () {
      this.drawer = true
      this.drawerTitle = '关于'
      this.drawerContent = '这是一个模仿Twitch的直播网站'
    },
    developerDrawer () {
      this.drawer = true
      this.drawerTitle = '开发人员'
      this.drawerContent = 'XXX,XX'
    },
    login () {
      this.$refs.userForm.validate((valid) => {
        if (valid) { // 表单校验合法
          console.log(this.user)
          axios({
            method: 'post',
            url: 'http://localhost:9090/login?email=' + this.user.email + '&password=' + this.user.password
          }).then(resp => {
            if (resp.data.code === 1) {
              // eslint-disable-next-line no-unused-expressions,no-sequences
              console.log(resp.data.code),
              this.$message.error('登录失败!')
            } else {
              console.log(resp.data)
              localStorage.setItem('user', JSON.stringify(resp.data.user))
              console.log(localStorage.getItem('user'))
              // console.log(JSON.parse(localStorage.getItem('user')))
              // this.$router.push("/bookSys")
              // this.newUser = JSON.parse(localStorage.getItem('user'))
              this.$message.success('登陆成功! ')
              window.location.reload()
              this.loginFormVisible = false
              this.checkLocalStorage()
            }
          })
        } else {
          this.$message.error('请输入正确的邮箱和密码！')
          return false
        }
      })
    },
    checkLocalStorage () {
      if (localStorage.getItem('user') != null) {
        // window.location.reload()
        this.showDiv = false
        this.isLoggedIn = true
      } else {
        // window.location.reload()
        this.showDiv = true
        this.isLoggedIn = false
      }
    },
    register () {
      this.$refs.userForm.validate((valid) => {
        if (valid) { // 表单校验合法
          console.log(this.user)
          axios({
            method: 'post',
            url: 'http://localhost:9090/register?email=' + this.user.email + '&userName=' + this.user.username + '&passWord=' + this.user.password
          }).then(resp => {
            if (resp.data.code === 1) {
              // eslint-disable-next-line no-unused-expressions,no-sequences
              console.log(resp.data.code),
              this.$message.error('注册失败!')
            } else {
              console.log(resp.data)
              // localStorage.setItem("user",JSON.stringify(resp.data));
              // this.$router.push("/bookSys")
              this.$message.success('注册成功! ')
            }
          })
        } else {
          this.$message.error('请输入正确的用户名、邮箱和密码！')
          return false
        }
      })
    },
    removelocalStorage () {
      localStorage.removeItem('user')
      console.log(localStorage.getItem('user'))
      this.$router.push({ path: '/', name: 'home' })
      window.location.reload()
    }
  },
  watch: {
    loginFormVisible (newVal) {
      if (!newVal) {
        this.user.email = '' // Clear the email input value
        this.user.username = '' // Clear the username input value
        this.user.password = '' // Clear the password input value
      }
    },
    registerFormVisible (newVal) {
      if (!newVal) {
        this.user.email = '' // Clear the email input value
        this.user.username = '' // Clear the username input value
        this.user.password = '' // Clear the password input value
      }
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-menu {
  background-color: #d3dce6;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}

::v-deep .el-input input {
  border: 2px solid gray;
}

::v-deep .el-input input:focus {
  border-color: #8D2EA9;
  border-width: 4px;
}

.myLogin-dialog .el-dialog-div {
  height: 52vh;
  overflow: auto;
}

.myRegister-dialog {
  height: 55vh;
  overflow: auto;
}

.dialog-title {
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-title {
  color: black;
  font-size: 25px;
  font-weight: bold;
}

/*修改弹框边框圆角*/
/deep/ .myLogin-dialog {
     border-radius: 6px;
}

/*修改弹框边框圆角*/
/deep/ .myRegister-dialog {
  border-radius: 6px;
}

/*修改弹框边框圆角*/
/deep/ .myInformation-dialog {
  border-radius: 6px;
}

b:hover {
  color: #8D2EA9;
}

.el-dropdown-link:hover {
  background-color: #c0bebe;
}

/deep/.el-drawer__header {
  color: black;
  font-size: xx-large;
  font-weight: bold;
}
</style>
