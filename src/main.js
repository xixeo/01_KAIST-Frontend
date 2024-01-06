import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import Cookies from 'js-cookie'
//import 'element-ui/lib/theme-chalk/index.css'

import envs from '@/envs'
import _ from 'lodash'
import localStore from '@/utils/localStore'

import i18n from './i18n'
import VueToastify from 'vue-toastify'
import Notifications from 'vue-notification'
//import VueSidebarMenu from 'vue-sidebar-menu'
//import VueSidebarMenu from './layout/components/sidebar/index'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// vuescroll 추가
import vuescroll from 'vue-scroll'
// import 'vuescroll/dist/vuescroll.css'

//import './assets/scss/vue-sidebar-menu.scss';
import '@fortawesome/fontawesome-free/css/all.css' // fontawesome

import './assets/icons' // icon

// 기본 / 사용자 정의 테마 정보를 가져온다.
var target = _.find(envs.framework.template.pcThemes, { id: envs.framework.template.pc })
var theme = {
  pc: target.id,
  devExtreme: target.devExtreme,
  eChart: target.echart,
  elementUI: target.elementui
}

// 사용자가 정의한 임의의 테마 정보
var localTheme = {
  pc: localStore.get('pc-theme'),
  mobile: localStore.get('mobile-theme'),
  devExtreme: localStore.get('theme-devExtreme'),
  eChart: localStore.get('theme-echart'),
  elementUI: localStore.get('theme-elementui')
}

if (localTheme.pc && typeof undefined !== localTheme.pc) {
  theme.pc = localTheme.pc // _.find(envs.framework.template.pcThemes, { id: localTheme.pc })
  console.log('pc theme', theme.pc)
}

if (localTheme.mobile && typeof undefined !== localTheme.mobile) {
  theme.mobile = localTheme.mobile // _.find(envs.framework.template.pcThemes, { id: localTheme.pc })
  console.log('mobile theme', theme.mobile)
}

if (localTheme.devExtreme && typeof undefined !== localTheme.devExtreme) {
  theme.devExtreme = localTheme.devExtreme
  console.log('theme:devExtreme -> ', theme.devExtreme)
}

if (localTheme.elementUI && typeof undefined !== localTheme.elementUI) {
  theme.elementUI = localTheme.elementUI
  console.log('theme:elementui -> ', theme.elementUI)
}

if (localTheme.eChart && typeof undefined !== localTheme.eChart) {
  theme.eChart = localTheme.eChart
  console.log('theme:echart -> ', theme.eChart)
}

// echart 라이브러리 및 테마 로딩
import '@/assets/theme/echart/index.js'

// global CSS(테마 정보에 맞게 설정)
require('@/assets/scss/styles/' + theme.pc + '/index.scss')

// Element-UI
// import 'element-ui/lib/theme-chalk/reset.css'
// require('@/assets/scss/styles/' + theme.elementUI + '/element-variables.scss')
// require('@/assets/theme/element-ui/' + theme.elementUI + '/index.css') // element ui 테마 css 적용

import { changeStyle } from '@/utils/themeSelectElementUI.js'
changeStyle(theme.elementUI, 'element-ui')

import ElementUI from 'element-ui' // element ui
//console.log(eval(foo))
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

//Splitpanes
import 'splitpanes/dist/splitpanes.css'

//vueDaumPostcode
import VueDaumPostcode from 'vue-daum-postcode'
Vue.use(VueDaumPostcode,{scriptUrl: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"})

// 전체 화면 사용시 레이아웃 감추는 여부 설정
store.dispatch('SetLayoutHideMode', target.layoutHideMode ? target.layoutHideMode : false)

import { Draggable } from 'draggable-vue-directive' // 엘리멘트 드래그 기능
// import { library as faLibrary } from '@fortawesome/fontawesome-svg-core'
// import { faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// faLibrary.add(faHome, faSearch, faPlus)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use({
  install(Vue, options) {
    Vue.directive('draggable', Draggable)
  }
})

// import BMap from 'vue-baidu-map'
// Vue.use(BMap, { ak: 'e1Sgs8qcnsRvwt7rGBGdcmzXGBHmEIMB' })

// Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueToastify, {
  position: 'center-center',
  canTimeout: false,
  theme: 'dark',
  iconEnabled: true,
  withBackdrop: true
})
Vue.use(VueDaumPostcode)
Vue.use(vuescroll)

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
