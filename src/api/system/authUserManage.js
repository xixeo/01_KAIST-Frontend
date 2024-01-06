import authUserData from './mock/authUserData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 권한별 사용자 조회
export function getUserAuth(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authUserData.list.forEach(item => {
        if (item.domainCd === param.domainCd && item.authgrpCd === param.authgrpCd) {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getUserAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한별 사용자 수정/추가
export function createUserAuth(param) {
  let data = param
  return request({
    url: `/api/createUserAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한별 사용자 삭제
export function deleteUserAuth(param) {
  let data = param
  return request({
    url: `/api/deleteUserAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
