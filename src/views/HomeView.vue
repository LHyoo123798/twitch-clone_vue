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
          <i class="el-icon-more" style="margin-left: 20px;transform: rotate(90deg)"></i>
        </div>
        <div style="height: 50px; width: 360px; display: flex; justify-content: center; align-items: center">
          <el-input style="height: 100%; width: 330px; margin: 0; display: flex; align-items: center;" placeholder="搜索"></el-input>
          <i class="el-icon-search" style="margin-left: 5px; font-size: 20px; font-weight: bold; line-height: 50px;"></i>
        </div>
        <div style="display: flex; align-items: center">
          <el-button type="primary" @click = "loginForm()" size="small" style="border-radius: 5px; border-color:#dad5d5;background-color: #dad5d5;font-weight: bold;color:black">登录</el-button>
          <el-button type="success" @click = "registerForm()" size="small" style="border-radius: 5px; border-color:#8D2EA9;background-color: #8D2EA9;font-weight: bold;">注册</el-button>
          <i class="el-icon-user" style="font-size: 20px;font-weight: bold;margin-left: 10px;"></i>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="sideWidth+'px'">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" :width="sideWidth+'px'">
          <el-menu-item>
            <span>推荐频道</span>
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
        <el-form label-width="80px" size="small">
          <el-form-item label="用户名" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="input" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="display: flex; justify-content: center;">
            <el-button style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 10px;border-radius: 6px">登录</el-button>
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
        <el-form label-width="80px" size="small">
          <el-form-item label="用户名" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="font-size: 16px; font-weight: bold;color: black">
            <el-input  autocomplete="off" v-model="input" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="display: flex; justify-content: center;">
            <el-button style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 10px;border-radius: 6px">注册</el-button>
          </div>
          <div style="display: flex; justify-content: center;">
            <el-button style="background-color: #8D2EA9;color: white;font-weight: bold;width: 400px;margin-top: 20px;border-radius: 6px" @click="registerTologin">已有账户？登录</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      carouselType: 'card', // 默认值为card
      sideWidth: 65,
      collapseBtnClass: 'el-icon-s-unfold',
      isCollapse: true,
      loginFormVisible: false,
      registerFormVisible: false,
      input: ''
    }
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

b:hover {
  color: #8D2EA9;
}
</style>
