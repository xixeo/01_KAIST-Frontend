import Layout from '@/layout'

const userRouter = {
  path: 'user',
  name: 'user',
  component: () => import('@/views/index.vue'),
  meta: { menu_id: 'MENU015', title: '사용자관리' },
  children: [
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/system/user/userManage/Index.vue'),
      meta: { menu_id: 'MENU016', title: '사용자관리' }
    },
    {
      path: 'organizationManage',
      name: 'organizationManage',
      component: () => import('@/views/system/user/organizationManage/Index.vue'),
      meta: { menu_id: 'MENU017', title: '조직관리' }
    }
  ]
}

export default userRouter
