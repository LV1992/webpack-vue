import request from '@/utils/request'
/**
 * 登陆请求
 * @param username 用户名
 * @param password 密码
 */
export function loginByUsername(username, password) {
  const data = {mobileNumber:username, password: password}
  //相当于ajax请求 参数不是data 是 params
  return request({
    url: GLOBAL.API.LOGIN,
    method: 'post',
    params : data
  })
}
/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
/**
 * 获取用户信息请求
 * @param token
 */
export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  })
}
