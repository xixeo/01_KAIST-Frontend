import deviceContolHistory from './mock/deviceControlHistory.json' // restful api를 사용하지 않을 경우
import { isUseAPI } from '@/utils/check'
import request from '@/utils/request'

// 디바이스 제어 이력 조회 2021-10-01 BY LYJ
export function getDeviceControlHistory(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      deviceContolHistory.list.forEach(item => {
        // console.log("item : " , item)
        res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/v1/getDevicePublishHistory`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
