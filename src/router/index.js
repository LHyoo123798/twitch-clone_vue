import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Twitch' // 标签页的文字
    },
    component: () => import('../views/HomeView.vue')
    // children: [
    //   {path: '/bookSys/person_info', name: '个人信息', component: () => import('../views/PersonInfo')},
    //   {path: '/bookSys/lib_info', name: '图书馆信息', component: () => import('../views/LibInfo')},
    //   {path: '/bookSys/manager_set', name: '管理员设置', component: () => import('../views/ManagerSet')},
    //   {path: '/bookSys/bookshelf_set', name: '书架设置', component: () => import('../views/BookShelfSet')},
    //   {path: '/bookSys/readertype_manage', name: '读者类型管理', component: () => import('../views/ReaderType')},
    //   {path: '/bookSys/readerinfo_manage', name: '读者信息管理', component: () => import('../views/ReaderInfo.vue')},
    //   {path: '/bookSys/booktype_manage', name: '图书类型管理', component: () => import('../views/BookType')},
    //   {path: '/bookSys/bookinfo_manage', name: '图书信息管理', component: () => import('../views/BookInfo')},
    //   {path: '/bookSys/borrow_return', name: '图书借还', component: () => import('../views/BorrowReturn')},
    //   {path: '/bookSys/sysinfo_check', name: '系统信息查询', component: () => import('../views/BookInfoSort')},
    //   {path: '/bookSys/borrowinfo_check', name: '/bookSys/borrowinfo_check', component: () => import('../views/BorrowInfoSort')}
    // ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
