import Layout from '@/layout'
import user from './user'
import auth from './auth'
import history from './history'

const systemRouter = {
  path: '/system',
  name: 'system',
  component: Layout,
  meta: { menu_id: 'MENU009', title: '시스템관리' },
  children: [
    // user,
    auth,
    history,
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/system/user/userManage/Index.vue'),
      meta: { menu_id: 'MENU091', title: '사용자관리' }
    },
    // {
    //   path: 'domainManage',
    //   name: 'domainManage',
    //   component: () => import('@/views/system/domainManage/Index.vue'),
    //   meta: { menu_id: 'MENU013', title: '도메인관리' }
    // },
    // {
    //   path: 'menuManage',
    //   name: 'menuManage',
    //   component: () => import('@/views/system/menuManage/Index.vue'),
    //   meta: { menu_id: 'MENU003', title: '메뉴관리' }
    // },
    {
      path: 'commonCodeManage',
      name: 'commonCodeManage',
      component: () => import('@/views/system/commonCodeManage/Index.vue'),
      meta: { menu_id: 'MENU092', title: '공통코드관리' }
    }
  ]
}

export default systemRouter
