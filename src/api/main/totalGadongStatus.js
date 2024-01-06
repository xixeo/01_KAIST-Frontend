import GadongStatusData from './mock/GadongStatusData.json' // restful api를 사용하지 않을 경우
import { isUseAPI } from '@/utils/check'
import request from '@/utils/request'

// 가동상태(for pie chart)
export function getTotalGadongStatusData(param) {
  let isTest = false //test
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      GadongStatusData.list.forEach(item => {
        //console.log('getGadongStatusData item : ', item)
        res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/v1/getAllDeviceGadongStatus`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
    //data: param
  })
}
