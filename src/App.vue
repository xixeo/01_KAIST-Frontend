<template>
  <div id="app">
    <router-view />
    <!-- <layout-pc/> -->
    <!-- <Layout/> -->
  </div>
</template>

<script>
import envs from './envs'
import store from '@/store'
import { getToken, getUserId } from '@/utils/token'

// var Layout =''
//  Layout = () => import('@/layout')

export default {
  name: 'App',
  components: {
    //Layout
  },
  data() {
    return {
      mobileMode: false
    }
  },
  beforeCreate() {
    let token = getToken()
    let userCd = getUserId()
    console.log('#App.vue')
    //if (token) {
    //  store
    //    .dispatch('SetUserInfo', {
    //      userId: userCd
    //    })
    //    .then(response => {
    //      // user 정보를 가져온 이후에 이동 및 메뉴 적용
    //      this.$store.dispatch('GetMenus')
    //    })
    //}
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0px !important;
  padding: 0px !important;
  overflow-y: hidden; //20210-10-22 by lyj
}
</style>
