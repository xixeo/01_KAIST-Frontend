import userMenuData from './mock/userMenu.json' // restful api를 사용하지 않을 경우
import authMenuData from './mock/authMenu.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// //권한메뉴
export function getAuthMenu(param) {
  //console.log('getAuthMenu param : '+userCd)
  let data = param
  let isTest = false
  

  console.log(isUseAPI());

  if (!isUseAPI() || isTest) {

    console.log("getAuthMenu : isTest");
    return new Promise(function(resolve, reject) {
      let res = authMenuData[param.userId]
      if (res.userId === 'admin') {
        resolve(res.menuList)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: `/api/getUserMenu`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 메뉴 조회
export function getUserMenu(param) {
  console.log('-------> api param : ' + JSON.stringify(param))
  let isTest = false
  if (!isUseAPI() || isTest) {
    console.log("getUserMenu : isTest");
    return new Promise(function(resolve, reject) {
      let res = userMenuData[param]
      if (param === res.userId) {
        resolve(res.treeMenus)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: '/api/getUserMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: param,
    meta: { apiVersion: '1.0.0' },
  })
}
