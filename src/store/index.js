/**
 * vuex存储配置
 */
import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)
//注册一个 action 通过 store.dispatch('permission 或 user 里的action')
const store = new Vuex.Store({
  modules: {
    permission,
    user
  }
})

export default store
