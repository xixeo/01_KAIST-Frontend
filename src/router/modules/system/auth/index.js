import Layout from '@/layout'

const authRouter = {
  path: 'auth',
  name: 'auth',
  component: () => import('@/views/index.vue'),
  meta: { menu_id: 'MENU018', title: '권한관리' },
  children: [
    {
      path: 'authGroupManage',
      name: 'authGroupManage',
      component: () => import('@/views/system/auth/authGroupManage/Index.vue'),
      meta: { menu_id: 'MENU019', title: '권한그룹관리' }
    },
    {
      path: 'authUserManage',
      name: 'authUserManage',
      component: () => import('@/views/system/auth/authUserManage/Index.vue'),
      meta: { menu_id: 'MENU020', title: '사용자별권한' }
    },
    {
      path: 'authMenuManage',
      name: 'authMenuManage',
      component: () => import('@/views/system/auth/authMenuManage/Index.vue'),
      meta: { menu_id: 'MENU021', title: '권한그룹별메뉴권한' }
    },
    {
      path: 'menuUserManage',
      name: 'menuUserManage',
      component: () => import('@/views/system/auth/menuUserManage/Index.vue'),
      meta: { menu_id: 'MENU022', title: '사용자별메뉴권한' }
    }
  ]
}

export default authRouter
