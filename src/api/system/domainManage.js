import domainData from './mock/domainData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 도메인 코드, 이름 조회
export function getDomainListData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) { //윤주
  return new Promise(function (resolve, reject) {
      let res = { list: [] }
      domainData.list.forEach(item => {
        if (item.domainStatusCd === param.domainStatusCd || param.domainStatusCd === '') res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getAllDomain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
       domainCd: param.domainCd,
       domainNm: param.domainNm,
       domainStatusCd: 'A00001',//domainCd  by lyj
       userId : param.userId
    }
  })
}

// 도메인 정보 조회
export function getDomainData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    console.log('mockup:getDomainData')
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      domainData.data.forEach(item => {
        if (item.domainStatusCd === param.domainStatusCd || param.domainStatusCd === '') {
          if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getDomain`,
    meta: { 
      apiVersion: '1.0.0'
      //,refreshToken: true
    },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 도메인 정보 수정/추가
export function updateDomainData(param) {
  let data = param
  return request({
    url: `/api/createDomain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 도메인 정보 삭제
export function deleteDomainData(param) {
  let data = param
  return request({
    url: `/api/deleteDomain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
