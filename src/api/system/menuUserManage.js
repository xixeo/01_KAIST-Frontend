import authMenuData from './mock/authMenuData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//권한 조회
export function getMenuUserAuth(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authMenuData.list.forEach(item => {
        if (
          (item.domainCd === param.domainCd || param.domainCd === '') &&
          (item.userId === param.userId || param.userId === '' || item.userNm === param.userNm || param.userNm === '')
        ) {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getMenuUserAuth`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 수정/추가
export function createMenuUserAuth(param) {
  let data = param
  return request({
    url: `/api/createMenuUserAuth`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 삭제
export function deleteMenuUserAuth(param) {
  let data = param
  return request({
    url: `/api/deleteMenuUserAuth`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
