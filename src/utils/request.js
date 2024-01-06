import axios from 'axios'

import router from '@/router'
import store from '../store'

import envs from '@/envs'
import dayjs from 'dayjs'
import { getToken, setToken, setJWT, getUserId, getDomainCd } from '@/utils/token'
import { Loading } from 'element-ui'

let baseUrl = envs.buildUrl
let loadingQueue = [] // global loading에서 사용하기 위한 다중 호출 제어 Queue
let loadingInstance // 로딩 제어를 위한 인스턴스 포인터
let loadingTerm = 500 // API 비동기로 인해 시점이 안맞아서 깜빡거리는 현상을 제어하기 위한 텀 기간 부여 용

if (process.env.NODE_ENV === 'development') {
  // 개발 환경일 경우 API위치를 셋팅한 곳으로 정의한다.
  baseUrl = envs.devUrl
}

function _getDefaultMeta() {
  return {
    useTokenUpdate: false, // 받아온 response에서 token 값을 가져와 재 셋팅을 할 경우 true로 셋팅한다.
    useAuth: true, // 인증 모듈을 사용한다. false가 되었을 경우 401 상태에서도 Login 화면으로 가지 않는다. (i18n과 같은 특별한 경우에서만 사용)
    apiVersion: envs.apiVersion, // API 버전을 호출 API 별로 정의 한다. 기본 값은 envs에 정의한 값으로 셋팅된다.
    useErrorMessage: true, // response 시, 에러가 날 경우 에러 메시지를 출력하는 여부를 셋팅한다. 기본은 true
    useResponseAll: false, // request 실행 이후, API로 돌아오는 Obj를 Axios response 전문으로 변경되어 전달한다. 기본은 false
    useProgress: true, // API 사용 간 Global Lock Progressive Bar 를 사용하는 것을 의미.
    useErrorConfirm: true // API 사용 간 에러가 발생할 경우, Error 전문 Confirm box가 출력되는 여부
  }
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000 //timeout은 20초로 설정
})

// axios의 reqeust 인터셉터 진행 부
instance.interceptors.request.use(
  config => {
    let systemId = envs.systemId
    let logKey = dayjs().format('YYYYMMDDHHmmssSSS') + systemId
    let channel = 'WEB_' + 'agentType'
    let vname = 'UI'
    let lang = 'ko'
    let mid = 'name'

    // meta 값 기본 정의
    if (!config.meta) config.meta = {}
    config.meta = Object.assign(_getDefaultMeta(), config.meta)
    config.meta.logkey = logKey
    //console.log('getToken() : ' + getToken())
    // 해더 구성
    config.headers['X-Auth-Token'] = getToken()
    config.headers['X-APIVERSION'] = config.meta.apiVersion
    config.headers['X-LOGKEY'] = logKey
    config.headers['X-CHANNEL'] = channel
    config.headers['X-VNAME'] = vname
    config.headers['X-LANG'] = lang
    config.headers['X-MID'] = mid
    config.headers['X-CALLTYPE'] = '0'
    config.headers['X-APP'] = envs.systemId

    // API 고유 값과, 완료 상태 값 셋팅
    loadingQueue.push({
      key: logKey,
      done: false,
      time: dayjs().format('YYYYMMDDHHmmssSSS')
    })

    return config
  },
  error => {
    // 에러가 날경우 진행 부분
    console.log('REQUEST error', error) // for debug
    Promise.reject(error)
    // 로딩 화면 닫기
    initLoadingProgress()

    let meta = error.request.config.meta
    var msg = error.message

    if (meta.useErrorMessage) {
      // 에러 경우 공통 에러 Confirm 창을 출력시킨다.
      store.dispatch('SetErrorMsg', { msg, status: error.request.status })
      store.dispatch('ShowErrorConfirm')
    }
  }
)

// loading progressivebar cloas 처리 및 API 실행 시간을 response 하는 로직
function checkLoadingProgress(meta) {
  let now = +new Date()
  let target = '' // _.find(loadingQueue, { key: meta.logkey })
  if (!target) {
    // 없는 경우, 방어 로직
    target = {
      time: now
    }
  }
  let loadingTime = now - target.time
  // API 비동기 딜레이 부여 (깜빡거림 방지)
  setTimeout(() => {
    target.done = true
    // 모든 비동기 API들이 다 수행됬는지 확인하는 로직
    if (loadingQueue.every(q => q.done)) {
      loadingQueue = []
      if (loadingInstance) loadingInstance.close()
    }
  }, loadingTerm)

  return loadingTime
}

// timeout 과 같은 에러 발생 시, 로딩 부분을 초기화
function initLoadingProgress() {
  loadingQueue = []
  if (loadingInstance) loadingInstance.close()
}

// axios의 response 인터셉터
instance.interceptors.response.use(
  response => {
    let res = {}
    let meta = response.config.meta

    // axios를 통해 response 내역 중 data에 서버에서 response된 값이 들어온다.
    // 각각 중복 랩핑 된 내역을 처리한다.
    if (response.data && response.data.datas) {
      res = response.data.datas
    } else if (response.data && response.data.data) {
      res = response.data.data
    } else if (response.data && response.data.dataList) {
      res = response.data.dataList
    } else {
      res = response.data
    }

    // res 규격이 Object가 아닐 경우 Object로 셋팅
    if (!Array.isArray(res) && typeof res !== 'object') {
      res = {
        body: res
      }
    }

    // loading 및 시간 처리
    let execTime = checkLoadingProgress(meta)
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'object') {
        res.result = response.data.result
      } else res.result = {}
    } else {
      res.result = {}
    }

    // API 수행 시간 적용
    res.result.execTime = execTime
    res.result.resMsg = ''
    if (res.result.total) {
      let tmpl = _.template('${total}건 중, ${success}건 성공, ${fail}건 실패. ${execTime}ms')
      let t = res.result.total
      res.result.resMsg = tmpl({
        total: t.count,
        success: t.success,
        fail: t.fail,
        execTime: execTime
      })
    }

    // useTokenUpdate 값이 true면 response headers 의 값을 받아와 token 값 업데이트
    if (meta.useTokenUpdate) {
      setJWT(response.headers['jwt'])
      setToken(response.headers['x-auth-token'])
    }

    // Axios 전문을 원할 경우 아래의 meta 값을 셋팅해서 사용한다.
    if (meta.useResponseAll) return response
    return res
  },
  error => {
    console.log('msg >>>', error.message) // for debug

    // response 부분 객체 내 meta 사용을 위한 기본 값 셋팅
    let meta = {}
    // request 기본 에러 값은 499로 설정한다.
    let status = '499'
    var msg = error.message

    if (error.response && error.response.config) {
      // request에서 meta 값이 있을 경우
      meta = error.response.config.meta
      checkLoadingProgress(meta)
    } else {
      meta = _getDefaultMeta()
      initLoadingProgress()
    }

    if (error.response) {
      // 토큰만료 /refreshtoken으로 재발급
      // 헤더에 refreshtoken으로 재발급여부 코드가 있어야 진행,, 없을경우 기존처럼 token만료 -> 로그인화면
      if (error.response.data.code == -1002 && error.response.status === 401 && error.response.config.meta.refreshToken) {
        store
          .dispatch('reissueToekn', {
            userId: getUserId(),
            domainCd: getDomainCd()
          })
          .then(response => {
            console.log('##토큰재발급 : ' + JSON.stringify(response))
            //토큰 발급 후 추가로직 작성
          })

        return Promise.reject(error)
      }

      // result에 메시지가 있을 경우 메시징 추가 처리
      if (error.response.data && error.response.data.result && error.response.data.result.desc) {
        msg = error.response.data.result.desc
      }

      // error.response가 없을 경우도 존재 - Network 문제
      if (meta.useAuth && error.response.status === 401) {
        // 401 에러
        msg = '세션이 만료되었거나, 로그인이 실패되었습니다.'
        // 남아 있는 세션 제거
        store.dispatch('ClearSession')
        // login 페이지로 이동
        router.push('/login')
      }

      status = error.response.status
    }
    // 에러 출력이 가용할 경우
    if (meta.useErrorMessage) {
      // 에러 경우 공통 에러 Confirm 창을 출력시킨다.
      store.dispatch('SetErrorMsg', { msg, status })
      store.dispatch('ShowErrorConfirm')
    }
    return Promise.reject(error)
  }
)

export default instance
