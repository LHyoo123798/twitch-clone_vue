<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(55, 45, 76)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <b style="color: white" v-show="LogoTextShow">图书管理系统</b>
    </div>

    <el-menu-item index="/bookSys/person_info">
      <i class="el-icon-s-home"></i><span slot="title">个人信息</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">系统设置</span>
      </template>
      <el-menu-item index="/bookSys/lib_info">图书馆信息</el-menu-item>
      <el-menu-item index="/bookSys/manager_set">管理员设置</el-menu-item>
      <el-menu-item index="/bookSys/bookshelf_set">书架设置</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">读者管理</span>
      </template>
      <el-menu-item index="/bookSys/readertype_manage">读者类型管理</el-menu-item>
      <el-menu-item index="/bookSys/readerinfo_manage">读者信息管理</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">图书管理</span>
      </template>
      <el-menu-item index="/bookSys/booktype_manage">图书类型管理</el-menu-item>
      <el-menu-item index="/bookSys/bookinfo_manage">图书信息管理</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">图书借还</span>
      </template>
      <el-menu-item index="/bookSys/borrow_return">图书借还</el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">系统查询</span>
      </template>
      <el-menu-item index="/bookSys/sysinfo_check">系统信息查询</el-menu-item>
      <el-menu-item index="/bookSys/borrowinfo_check">借阅信息查询</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideComponent',
  props: {
    isCollapse: Boolean,
    LogoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>
