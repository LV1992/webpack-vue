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

// {path: '/404', component: _import('errorPage/404'), hidden: true},
// {path: '/401', component: _import('errorPage/401'), hidden: true},
  {//根路径跳转登陆页
    path: '/',
    redirect: '/login'
  },
  {//配置首页进入系统的第一页路由
    path: '/readme',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children:[
      {
        path: '/',
        component: resolve => require(['../views/Readme.vue'], resolve)
      },
      {
        path: '/basetable',
        component: resolve => require(['../views/BaseTable.vue'], resolve)
      },
      {
        path: '/vuetable',
        component: resolve => require(['../views/VueTable.vue'], resolve)     // vue-datasource组件
      },
      {
        path: '/baseform',
        component: resolve => require(['../views/BaseForm.vue'], resolve)
      },
      {
        path: '/vueeditor',
        component: resolve => require(['../views/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
      },
      {
        path: '/markdown',
        component: resolve => require(['../views/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
      },
      {
        path: '/upload',
        component: resolve => require(['../views/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
      },
      {
        path: '/basecharts',
        component: resolve => require(['../views/BaseCharts.vue'], resolve)   // vue-schart组件
      },
      {
        path: '/drag',
        component: resolve => require(['../views/DragList.vue'], resolve)    // 拖拽列表组件
      }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['../views/Login.vue'], resolve)
  },
  {   //登录页面
    path: '/welcome',
    name: 'login',
    title: 'vue login',
    component: login
  },
]
//导出路由
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: routes
})
