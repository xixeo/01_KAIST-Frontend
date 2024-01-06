import Layout from '@/layout'

const historyRouter = {
  path: 'history',
  name: 'history',
  component: () => import('@/views/index.vue'),
  meta: { menu_id: 'MENU023', title: '이력관리' },
  children: [
    {
      path: 'userAccessLog',
      name: 'userAccessLog',
      component: () => import('@/views/system/history/userAccessLog/Index.vue'),
      meta: { menu_id: 'MENU024', title: '사용자접속이력' }
    },
    {
      path: 'authGroupLog',
      name: 'authGroupLog',
      component: () => import('@/views/system/history/authGroupLog/Index.vue'),
      meta: { menu_id: 'MENU025', title: '권한그룹이력' }
    },
    {
      path: 'authUserLog',
      name: 'authUserLog',
      component: () => import('@/views/system/history/authUserLog/Index.vue'),
      meta: { menu_id: 'MENU026', title: '권한별사용자이력' }
    },
    {
      path: 'authMenuLog',
      name: 'authMenuLog',
      component: () => import('@/views/system/history/authMenuLog/Index.vue'),
      meta: { menu_id: 'MENU027', title: '권한그룹별메뉴권한이력' }
    }
  ]
}

export default historyRouter
