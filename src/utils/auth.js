import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(session) {
  return localStorage.getItem(session)
}

export function setToken(sessionKey,session) {
  return localStorage.setItem(sessionKey, session)
}

export function removeToken(session) {
  return localStorage.removeItem(session)
}
