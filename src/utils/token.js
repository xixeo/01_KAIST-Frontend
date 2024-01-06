import Cookies from 'js-cookie'

const TokenKey = 'Token'
const RefreshTokenKey = 'RefreshToken'
const JWTKey = 'JWT'
const UserKey = 'UserId'
const DomainKey = 'DomainCd'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
  //console.log("==============1============" + Cookies.get(TokenKey))
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function getRefreshToken() {
  return window.sessionStorage.getItem(RefreshTokenKey)
  //console.log("==============1============" + Cookies.get(TokenKey))
  // return Cookies.get(TokenKey)
}

export function setRefreshToken(token) {
  return window.sessionStorage.setItem(RefreshTokenKey, token)
}

export function setCookieToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  removeUser()
  //return window.sessionStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserKey)
}

export function setUserId(token) {
  return Cookies.set(UserKey, token)
}

export function getDomainCd() {
  return Cookies.get(DomainKey)
}

export function setDomainCd(token) {
  return Cookies.set(DomainKey, token)
}


export function removeUser() {
  return Cookies.remove(UserKey)
}

export function setJWT(token) {
  return window.sessionStorage.setItem(JWTKey, token)
}

export function getJWT() {
  return window.sessionStorage.getItem(JWTKey)
}

export function removeJWT() {
  return window.sessionStorage.removeItem(JWTKey)
}

export function setID(userId) {
  return window.sessionStorage.setItem(UserKey, userId)
}

export function getID() {
  return window.sessionStorage.getItem(userID)
}

export function removeID() {
  return window.sessionStorage.removeItem(userID)
}
