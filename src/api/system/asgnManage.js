import asgnData from './mock/asgnData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 조직 정보 조회
export function getAsgnData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(asgnData.treeList).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            domainCd: item.domainCd,
            asgnCd: item.asgnCd,
            asgnNm: item.asgnNm,
            prntsCd: item.prntsCd,
            sort: item.sort,
            level: item.level,
            asgnType: item.asgnType,
            note: item.note,
            insertDt: item.insertDt,
            insertId: item.insertId,
            updateDt: item.updateDt,
            updateId: item.updateId
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/api/getAsgn`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 조직코드 중복 확인
export function checkAsgnCdData(param) {
  let data = param
  return request({
    url: `/api/checkAsgnCd`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 조직 정보 수정/추가
export function updateAsgnData(param) {
  let data = param
  return request({
    url: `/api/createAsgn`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 조직 정보 삭제
export function deleteAsgnData(param) {
  let data = param
  return request({
    url: `/api/deleteAsgn`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
