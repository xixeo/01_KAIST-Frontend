import deviceStatusByTime from './mock/deviceStatusByTimeData.json' // restful api를 사용하지 않을 경우
import { isUseAPI } from '@/utils/check'
import request from '@/utils/request'

// 시간별 가동 디바이스들의 수 정보 조회(for line chart)
export function getDevicesStatusByTime() {
  let isTest = false //test
  //let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      deviceStatusByTime.list.forEach(item => {
        //console.log('getGadongStatusData item : ', item)
        res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/api/v1/getDevicesStatusByTime`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
    //data: param
  })
}
