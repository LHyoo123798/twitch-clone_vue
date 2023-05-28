import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'tcplayer.js/dist/tcplayer.min.css'
// // 导出aliplayer
// import 'aliyun-aliplayer'
// // 导出样式
// import 'aliyun-aliplayer/dist/skins/default/aliplayer-min.css'
import VueAliplayerV2 from 'vue-aliplayer-v2'
import { vueBaberrage } from 'vue-baberrage'

Vue.use(ElementUI).use(VueAliplayerV2).use(vueBaberrage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
