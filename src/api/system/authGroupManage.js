import authGroupData from './mock/authGroupData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 그룹권한 코드, 이름 조회
export function getAuthgrpListData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authGroupData.list.forEach(item => {
        // console.log("item : " , item)
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//그룹권한 조회
export function getAuthGroupData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authGroupData.list.forEach(item => {
        if (
          (item.domainCd === param.domainCd || param.domainCd === '') 
            &&(item.authgrpCd === param.authgrpCd || param.authgrpCd === '') 
            && (item.authgrpNm === param.authgrpNm || param.authgrpNm === '')){
              res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//권한 유형(공통코드) 조회
export function getAuthTypeList(param) {
  let isTest = false
  let data = param
  // console.log('getAuthType param', data)
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      // authGroupData.list.forEach(item => {
      //   if (
      //     (item.domainCd === param.domainCd || param.domainCd === '') 
      //       &&(item.authgrpCd === param.authgrpCd || param.authgrpCd === '') 
      //       && (item.authgrpNm === param.authgrpNm || param.authgrpNm === '')){
      //         res.list.push(item)
      //   }
      // })
      resolve(res)
    })
  }
  return request({
    url: `/api/getCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 수정/추가
export function updateAuthGroupData(param) {
  let data = param
  console.log(data[0].useYn)
  data[0].useYn = (data[0].useYn == true || data[0].useYn == 'Y') ? 'Y' : 'N'
  console.log(data[0].useYn)
  return request({
    url: `/api/createAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 삭제
export function deleteAuthGroupData(param) {
  let data = param
  return request({
    url: `/api/deleteAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
