/**
 * UI-Framework Store
 *
 * Store는 Vuex를 사용하여 전역으로 사용되는 저장소로 활용합니다.
 * 전역으로 영향을 미치는 내용들은 여기서 관리되어야 합니다.
 * 권한, 메뉴 등, 각 세부적인 내역들은 해당 위치의 ./modules 디렉토리에,
 * 각 단위별로 정의합니다.
 *
 * 해당 기능은 UI-Framework에서 대부분 구현 예정이며,
 * 필요에 의하여 저장소를 사용할 경우, ./modules 로 사전 정의하고,
 * 이곳에 등록하면됩니다.
 * */

import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'vue-uuid'
import getters from './getters'
import menu from './modules/menu'
import ui from './modules/ui'
import user from './modules/user'
import settings from './modules/settings'
import app from './modules/app'
import tagsView from './modules/tagsView' 

Vue.use(Vuex)
Vue.use(UUID)

export default new Vuex.Store({

     modules : {
         user,
         menu,
         ui,
         settings,
         app,
         tagsView
     },
     getters
})