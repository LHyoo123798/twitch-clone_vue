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
      {
        path: '/',
        name: '首页',
        meta: {
          title: 'Twitch' // 标签页的文字
        },
        component: () => import('../views/HomePage')
      },
      {
        path: '/directory',
        name: '类别',
        meta: {
          title: '所有类别 - Twitch' // 标签页的文字
        },
        component: () => import('../views/DirectoryPage')
      },
      {
        path: '/live',
        name: '直播',
        meta: {
          title: 'Live' // 标签页的文字
        },
        component: () => import('../views/LivePage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next() // 执行进入路由，如果不写就不会进入目标页
})

export default router
