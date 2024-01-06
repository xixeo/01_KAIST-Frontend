import cmCodeData from './mock/cmCodeData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 도메인 코드, 이름 조회
export function getAllCmCode(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      cmCodeData.list.forEach(item => {
        if (item.level === param.level) res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getAllCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 도메인 정보 조회
export function getCmCode(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      cmCodeData.data.forEach(item => {
        if (item.prntsCd === param.prntsCd && param.level === '1') {
          res.list.push(item)
        }
      })
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

// 도메인 정보 조회
export function getChildCmCodeList(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      cmCodeData.data.forEach(item => {
        if (item.prntsCd === param.prntsCd && param.level === '1') {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/getChildCmCodeList`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 도메인 정보 수정/추가
export function createCmCode(param) {
  let data = param
  return request({
    url: `/api/createCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 도메인 정보 삭제
export function deleteCmCode(param) {
  let data = param
  return request({
    url: `/api/deleteCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
