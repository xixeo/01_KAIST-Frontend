import router from '@/router'
import store from '../store'
import axios from 'axios'
import envs from '@/envs'

let baseUrl = envs.baseUrl

if (process.env.NODE_ENV === "development") {
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
    baseURL : baseUrl,
    timeout : 20000 //timeout은 20초로 설정
})

// axios의 reqeust 인터셉터 진행 부
axios.interceptors.request.use(
    config => {
        config.headers.authorization = localStorage.getItem("token");
        return config;
    },
    error => Promise.reject(error)
)

export default instance