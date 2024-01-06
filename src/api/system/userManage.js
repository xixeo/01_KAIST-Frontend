import userManageData from './mock/userManage.json' // restful api를 사용하지 않을 경우
import loginData from '../common/mock/login.json' 
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 사용자관리 조회조건 selectBox 조회
export function getUserManageListData(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      userManageData.list.forEach(item => {
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 팝업 조직코드 selectBox 조회
export function getAsgnListData(param) { //작성중
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      userManageData.asgn.forEach(item => {
        if (item.asgnCd === param.asgnCd || param.asgnCd === '') res.list.push(item)
      })
      resolve(res)

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

// 팝업 사용자 타입 selectBox 조회
export function getuserTypeListData(param) { //작성중
  let isTest = false
  let data = param
  console.log('getuserTypeListData Test : ', data)
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      userManageData.userType.forEach(item => {
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      })
      // console.log("js", res)
      resolve(res)
    })
  }
  return request({
    url: `/api/getCmCode`, //추가
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사용자관리 정보 조회
export function getUserManageData(param) {
  let isTest = false
  let data = param
  // console.log('사용자관리 정보조회 paramData',data)
  if (!isUseAPI()|| isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      userManageData.data.forEach(item => {
        if ((item.domainCd === param.domainCd || param.domainCd === '')
            && ((item.userId === param.userId || param.userId === '')
                  && (item.userNm === param.userNm || param.userNm === ''))) {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사용자관리 정보 수정/추가
export function updateUserManageData(param) {
  let data = param
  data[0].useYn = (data[0].useYn == true || data[0].useYn == 'Y') ? 'Y' : 'N'
  return request({
    url: `/api/createUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 관리자 비밀번호 확인
export function checkAdminPass(param) {
  let isTest = false
  let data = param[0]
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { }
      if ((loginData.admin.userCd === 'admin'
             && loginData.admin.userPw === data.userPw)) {
        res.code = 200
        res.msg = "성공하였습니다."
      }else{
        res.code = -1200
        res.msg = "비밀번호가 틀렸습니다."
      }
      resolve(res)
    })
  }
  return request({
    url: `/api/checkAdminPw`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 사용자관리 비밀번호 변경
export function updateUserPass(param) {
  let data = param[0]
  // console.log('updateUserPass: ',data)
  return request({
    url: `/api/updateUserPass`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사용자관리 정보 삭제
export function deleteUserManageData(param) {
  let data = param
  return request({
    url: `/api/deleteUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
