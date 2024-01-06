import gridData from './mock/gridData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// data 그리드 조회(목업)
export function getGridData() {
  return new Promise(function(resolve, reject) {
    let res = gridData
    resolve(res.list)
  })
}

// 그리드 조회(목업)
export function getTreeGridData() {
  return new Promise(function(resolve, reject) {
    let res = gridData
    resolve(res.treeList)
  })
}

//api테스트
export function api_test(url, data, method) {  
  console.log(' @ method : ' +method + ' @ url : ' + url + ' @data ' + JSON.stringify(data) )
  return request({
    url: url,
    data: data,
    meta: {apiVersion: '1.0.0'},
    method: method,
    headers: { 'Content-Type': 'application/json' }
  })
}   

//api테스트2
export function api_test2() {  
  return request({
    url: "/api/sample/testPostMapping",
    data: {
      userId: 'admin',
    },
    meta: {apiVersion: '1.0.0'},
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
}   