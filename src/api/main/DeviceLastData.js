import DeviceLastData from './mock/DeviceLastData.json' // restful api를 사용하지 않을 경우
import { isUseAPI } from '@/utils/check'
import request from '@/utils/request'

// 비가동 목록 조회(for datagrid)
export function getDeviceLastData(param) {
  let isTest = false //test
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      DeviceLastData.list.forEach(item => {
        //console.log('getDeviceLastData item : ', item)
        res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/v1/getDeviceStatusForDashboard`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
