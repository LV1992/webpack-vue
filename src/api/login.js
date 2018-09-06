import request from '@/utils/request'
/**
 * 登陆请求
 * @param mobile 手机号
 * @param password 密码
 */
export function loginByUsername(mobile, password) {
  const data = {mobile:mobile, password: password}
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
/**
 * 第三方登录获取验证码
 * @param mobile 手机号
 * @param password 密码
 */
export function thirdLoginGetQrCode(mobile, password) {
  return request({
    url: GLOBAL.API.THIRD_LOGIN,
    method: 'post',
    params : data
  })
}
