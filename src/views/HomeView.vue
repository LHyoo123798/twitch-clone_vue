<template>
  <el-container>
    <el-header style="height: 3.2rem">
      <div style="margin: -6px 0;height: 4rem">
        <el-input style="width: 330px" placeholder="搜索"></el-input>
        <i class="el-icon-search" style="margin-left: 5px"></i>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:235px;">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item>
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
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapseBtnClass: 'el-icon-s-unfold',
      isCollapse: true
    }
  },
  methods: {
    collapse () { // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) { // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
      } else { // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
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
  background-color: #b3c0d1;
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
  width: 200px;
  min-height: 400px;
}
</style>
