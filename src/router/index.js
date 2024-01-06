import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import envs from '@/envs'
import Layout from '@/layout'

import Login from '@/layout/components/Login.vue'
import Logout from '@/layout/components/Logout'
import { getToken } from '@/utils/token'

import system from './modules/system' //시스템관리
import template from './modules/template' //template
import monitoring from './modules/monitoring' //Device 이력
import config from './modules/config' //Device 관리


Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: 'main',
      children: [
        {
          path: '/main',
          name: 'main',
          component: () => import('@/views/main/Main.vue'),
          meta: { menu_id: 'MENU001', title: '대시보드(메인)', affix: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    monitoring,
    config,
    system,
    template
  ]
})

router.beforeEach(function (to, from, next) {
  let loginWhiteList = [...envs.framework.whiteList]
  // 세션 적용 되면 이곳 로직 변경
  if (
    !loginWhiteList.some(path => {
      return path === to.path
    })
  ) {
    if (to.query.id) {
      console.log('단독 페이지호출시 next(/login)되던것을 막음')
    } else {
      if (!getToken() && to.path !== '/login') {
        next('/login')
        //next(`/login?redirect=${to.path}`)
        return
      } else {
        if (!getToken() && to.path !== '/blank' && to.path !== '/not-found') {
          next('/blank')
          return
        }
      }
    }
  }
  next()
})

//네비게이션 가드(전역 가드) : 사용자의 인증 정보가 없으면 특정 페이지에 접근하지 못하게 할 때 사용하는 기술입니다.
//router.beforeEach( function (to, from, next) {
//to : 이동할 url
//from : 현재 url
//next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수

//to: 이동할 url에 해당하는 라우팅 객체
//console.log("routing 1 : '" + to.path + "'" );
//console.log("routing 2 : '" + from.path + "'" );

//store.dispatch('SetHeaderUse', to.meta.headerView !== false)

// if (to.matched.some(function (routeInfo)
// {
//   console.log("routeInfo.meta.authRequired: " + routeInfo.meta.authRequired)
//     return routeInfo.meta.authRequired;
// })) {
//     next('/login')
//     return

// } else {
//     console.log("routing success : '" + to.path + "'" )
//     next();
//     return
// }

//})

export default router
