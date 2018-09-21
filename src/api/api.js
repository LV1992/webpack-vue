/**
 * 借口定义
 * @type {{}}
 */
const API = {
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  WEB_SOCKET: 'user/websocket',
  THIRD_LOGIN: 'user/login',
  THIRD_LOGIN_GET_QRCODE: 'common/getQrCode',
  GET_USER_PERMISSION: 'permission/getPermissionsByUserId'
}

export default {
  API
}
