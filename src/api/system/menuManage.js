import menuData from './mock/menuData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 메뉴 정보 조회
export function getMenuData(param) {
  console.log("getMenuData(param) : "+ param)
  let isTest = false
  let data = param

      console.log("윤주" + param.domainCd);

  if (!isUseAPI() || isTest) {
    return new Promise(function (resolve, reject) {

      let dataList = { list: [] }
      _.cloneDeep(menuData.treeList).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            domainCd: item.domainCd,
            menuCd: item.menuCd,
            menuNm: item.menuNm,
            prntsCd: item.prntsCd,
            sort: item.sort,
            icon: item.icon,
            level: item.level,
            useYn: item.useYn,
            menuDesc: item.menuDesc,
            menuUrl: item.menuUrl
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/api/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 하위레벨 메뉴 정보 조회
export function getLowerLevelMenu(param) {
  let isTest = false
  let data = param
  return request({
    url: `/api/getLowerLevelMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴 정보 수정/추가
export function updateMenuData(param) {
  let data = param
  return request({
    url: `/api/createMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴 정보 삭제
export function deleteMenuData(param) {
  let data = param
  return request({
    url: `/api/deleteMenu`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
