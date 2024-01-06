import loginMockupData from './mock/login.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import Cookies from 'js-cookie'
import { isUseAPI } from '@/utils/check'
import { getToken, setToken, getID, setID, setUserId, getUserId, getRefreshToken } from '@/utils/token'

export function loginByPassword(userCd, userPw, domainCd) {
  

  console.log(userCd)
  console.log(userPw)
  console.log(domainCd)
  let isTest = false
  if (!isUseAPI() || isTest) {
     console.log('mock login')
    return new Promise(function(resolve, reject) {
      console.log('mock login')
      let res = loginMockupData[userCd]
      let pw = loginMockupData[userCd].userPw
      if (res && pw === userPw) {
        resolve(res)
        setToken(userCd) // mockup에서는 토큰값이 userCd로 사용한다.
        setID(userCd)
        Cookies.set('UserId', userCd)
        Cookies.set('DomainCd', domainCd)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: '/com/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      userId: userCd,
      userPw: userPw,
      domainCd: 'A00001'//domainCd  윤주 일단 고정하자 나중에는 제거 대상
    },
    meta: {
      useErrorMessage: false,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}

export function getUserInfoBySession(userId) {
  let isTest = false
  let domainCd = 'a'
  if (!isUseAPI() || isTest) {
    // restful api를 사용하지 않을 경우 login.json에 등록된 계정만 가져온다.
    return new Promise(function(resolve, reject) {
      // local에서는 token 값에 userId를 넣는다.
      let res = loginMockupData[userId]
      if (res) {
        resolve(res) // 기존 토큰 값 있는 여부 확인
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }

  return request({
    url: '/com/getUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      userId: userId,
      domainCd: domainCd
    },
    meta: { apiVersion: '1.0.0' },
  })
}

export function logout() {
  // let isTest = false
  // if (isUseAPI() || isTest) {
  //   console.log('logout')
  //   return request({
  //     url: '/api/logout',
  //     meta: { apiVersion: '1.0.0' },
  //     method: 'post'
  //   })
  // }
  // restful api를 사용하지 않을 경우
  return new Promise(function(resolve, reject) {
    console.log('logout', resolve)
    resolve()
  })
}


export function reissueToekn(tokenInfo) {
  let userRefreshToken = getRefreshToken()
  console.log('** userRefreshToken : ' + userRefreshToken)
  return request({
    url: '/com/reissue',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      userId: tokenInfo.userId,
      refreshToken: userRefreshToken,
      domainCd: tokenInfo.domainCd
    },
    meta: {
      useErrorMessage: true,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}