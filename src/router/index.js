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
    component: () => import('../views/HomeView.vue'),
    children: [
      { path: '/', name: '首页', component: () => import('../views/HomePage') },
      { path: '/directory', name: '分类', component: () => import('../views/DirectoryPage') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
