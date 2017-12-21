import request from '@/utils/request'
/**
 * 登陆请求
 * @param username
 * @param password
 */
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
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
    params: { token }
  })
}
