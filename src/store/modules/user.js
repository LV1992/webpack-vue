import { loginByUsername, logout, getUserInfo,thirdLoginGetQrCode } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {websocket} from "../../api/login";
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken('session'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录方法
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        //请求login接口
        loginByUsername(username, userInfo.password).then(response => {
          //返回结果
          const data = response.data
          if(data && data.success){
            //把token放入
            commit('SET_TOKEN', data.result)
            //存localStorage
            setToken('session',JSON.stringify(data.result))
            //登陆成功
            resolve()
          }else {
            //把响应结果返回
            reject(data)
          }
        }).catch(error => {
          //登录拒绝
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    ThirdLoginGetQrCode() {
      return new Promise((resolve, reject) => {
        //ajaxa请求获取二维码
        thirdLoginGetQrCode().then(response => {
          //返回结果
          const data = response.data
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        const session = user.state.token
        if (session == null){
          resolve()
        }
        logout(session.sessionKey).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken('session')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
