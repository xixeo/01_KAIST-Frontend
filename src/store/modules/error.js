export default {
    state: {
      showConfirm: false,
      msgList: [],
      summary: {}
    },
    mutations: {
      CLEAR_MSG_LIST: state => {
        state.msgList = []
      },
      CLEAR_SUMMARY: state => {
        state.summary = {}
      },
      SET_SHOW_CONFIRM: (state, showConfirm) => {
        state.showConfirm = showConfirm
      },
      PUSH_MSG: (state, msg) => {
        state.msgList.push(msg)
      },
      SET_SUMMARY: (state, status) => {
        if (state.summary[status]) {
          state.summary[status]++
        } else {
          state.summary[status] = 1
        }
      }
    },
    actions: {
      CloseErrorConfirm({ commit }) {
        commit('CLEAR_MSG_LIST')
        commit('CLEAR_SUMMARY')
        commit('SET_SHOW_CONFIRM', false)
      },
      ShowErrorConfirm({ commit }) {
        commit('SET_SHOW_CONFIRM', true)
      },
      SetErrorMsg({ commit }, { msg, status }) {
        if (!msg || !status) return
        commit('PUSH_MSG', msg)
        commit('SET_SUMMARY', status)
      }
    }
  }
  