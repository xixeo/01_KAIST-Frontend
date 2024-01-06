import { loginByPassword, getUserInfoBySession, logout, reissueToekn } from '@/api/common/login'
// import { api_getEmpInfo } from "@/api/common/commonCodeApi"

import { getToken, removeToken, setUserId, setToken, setRefreshToken, setCookieToken, setDomainCd } from '@/utils/token'
import localStore from '@/utils/localStore'
import { isUseAPI } from '@/utils/check'

export default {
  //namespaced: true,

  //data
  state: {
    token: '',
    userId: '',
    userName: '',
    clntId: '',
    compId: '',
    plntId: '',
    empNo: '',
    deptCd: '',
    bpCd: '',
    jbl: '',
    jbrp: '',
    trad: '',
    dimDiv: '',
    foreignYn: '',
    roles: [],
    auths: [],
    menuGroup: '',
    menuPermission: '',
    registName: '',
    registPhoneNumber: '',
    buttonPermission: '',
    myMenu: []
  },

  //데이터 변경시
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_DOMAIN_CD: (state, domainCd) => {
      state.domainCd = domainCd
    },
    SET_DIM_DIV: (state, dimDiv) => {
      state.dimDiv = dimDiv
    },
    SET_FOREIGN: (state, foreignYn) => {
      state.foreignYn = foreignYn
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHS: (state, auths) => {
      state.auths = auths
    },
    SET_MENU_GROUP: (state, menuGroup) => {
      state.menuGroup = menuGroup
    },
    SET_COOKIE_TOKEN: (state, token) => {
      state.token = token
    }
  },

  //methods
  actions: {
    LoginByPassword({ commit }, userInfo) {
      let isTest = false
     if (!isUseAPI() || isTest) { 
        console.log('mock!!')
        return new Promise(function(resolve, reject) {
          setToken(userInfo.userId)
          setCookieToken(userInfo.userId)
          loginByPassword(userInfo.userId, userInfo.userPassword, userInfo.domainCd)
            .then(reponse => {
              
              let userToken = getToken()
              console.log('토큰(목업)', userToken)
              commit('SET_TOKEN', userToken)
              localStore.set('isAutoLogin', userInfo.isAutoLogin)
              if (userInfo.isAutoLogin === true) {
                localStore.set('token', userToken)
              }
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
      }
      return new Promise(function(resolve, reject) {
        
        loginByPassword(userInfo.userId, userInfo.userPassword, userInfo.domainCd).then(reponse => {
            setToken(reponse.map.accessToken)
            setRefreshToken(reponse.map.refreshToken)
            //setCookieToken(reponse.map.accessToken)
            console.log('loginByPassword - session --> ' + userInfo.domainCd)
            setDomainCd(userInfo.domainCd)
            setUserId(userInfo.userId)
            let userToken = getToken()
            //console.log('토큰', userToken)
            //commit('SET_TOKEN', userToken)
            localStore.set('isAutoLogin', userInfo.isAutoLogin)
            if (userInfo.isAutoLogin === true) {
              localStore.set('token', userToken)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SetUserInfo({ commit }, userInfo) {
      return new Promise(function(resolve, reject) {
        getUserInfoBySession(userInfo.userId)
          .then(response => {
            console.log('loginresponse', response)
            response = Array.isArray(response) ? response[0] : response
            if (response) {
              commit('SET_USER_ID', response['userId'])
              commit('SET_USER_NAME', response['userNm'])
              commit('SET_TOKEN', getToken())
              commit('SET_COOKIE_TOKEN', getToken())
              commit('SET_DOMAIN_CD', response['domainCd'])
            }

            // sessionStorage
            // window.sessionStorage.setItem('user_id', response['userCd'])
            // window.sessionStorage.setItem('user_name', response['userNm'])

            // window.sessionStorage.setItem("compId", response["compId"])
            // setUserId(response["userCd"])

            // let menuGrpCd = response["menuGrpCd"]
            // let authGrpCd = ""

            // console.log("authList", response["authList"], menuGrpCd, authGrpCd)
            // for (var i = 0; i < response["authList"].length; i++) {
            //   authGrpCd = response["authList"][0].grpAuthCd
            // }

            // // sessionStorage
            // window.sessionStorage.setItem("menuGrpCd", menuGrpCd)
            // window.sessionStorage.setItem("authGrpCd", authGrpCd)
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //토큰 재발급 후 세션에 새로운 토큰 저장
    reissueToekn({ commit }, tokenInfo) {
      return new Promise(function(resolve, reject) {
        reissueToekn(tokenInfo)
          .then(response => {
            //console.log('토큰재발급완료! ', response.accessToken)
            setToken(response.accessToken)
            if(response.refreshToken) { 
              //refresh toke은 만료기간이 7일이전에만 재발급함
              //console.log('refresh token 재발급완료! ', response.refreshToken)
              setRefreshToken(response.refreshToken)
            }
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          window.sessionStorage.clear()
          dispatch('ClearSession')
          resolve()
        })
      })
    },
    ClearSession({ commit }) {
      commit('SET_USER_ID', '')
      commit('SET_USER_NAME', '')
      commit('SET_DOMAIN_CD', '')
      commit('SET_TOKEN', '')
      removeToken()
    }
  },

  //computed
  getters: {}
}
