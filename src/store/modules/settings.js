import envs from '@/envs'

var variables = require('@/assets/scss/styles/' + envs.framework.template.pc + '/element-variables.scss')

export default {

  namespaced: true,

   //data
  state:{
    theme: variables.theme,
    showSettings: true,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: false
  },

  //데이터 변경시
  mutations : {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },

   //methods
  actions : {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  },

}  