import Vue from 'vue'
// 引用login模板
import login from '../views/login/index.vue'
// 引用路由
import Router from 'vue-router'
// 使用 vueRouter
Vue.use(Router);

/**
 * 定义路由配置
 * @type {[*]}
 */
export const routes = [
  {   //登录页面
    path:'/',
    name:'login',
    title:'vue login',
    component:login
  },
// {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
// {path: '/404', component: _import('errorPage/404'), hidden: true},
// {path: '/401', component: _import('errorPage/401'), hidden: true},
]
//导出路由
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
