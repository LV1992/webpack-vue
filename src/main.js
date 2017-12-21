// 引用 vue 没什么要说的
import Vue from 'vue'
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'

Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})
