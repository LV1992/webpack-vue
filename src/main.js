// 引用 vue 没什么要说的
import Vue from 'vue'
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import '../static/css/theme-green/index.css';       // 浅绿色主题
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
//vuex
import store from './store'
//接口地址 使用：this.$API
import API from './api/api'
window.GLOBAL = API

Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
//初始化router，store
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App)
})
