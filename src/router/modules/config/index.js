import Layout from '@/layout'

const deviceconfigRouter = {
  path: '/config',
  name: 'config',
  component: Layout,
  meta: { menu_id: 'MENU004', title: '기준 정보' },
  children: [
    {
      path: 'deviceGrpManager',
      name: 'deviceGrpManager',
      component: () => import('@/views/config/deviceGrpManager.vue'),
      meta: { menu_id: 'MENU041', title: 'Device 그룹 관리' }
    },
    {
      path: 'deviceManager',
      name: 'deviceManager',
      component: () => import('@/views/config/deviceManager.vue'),
      meta: { menu_id: 'MENU042', title: 'Device 기기 관리' }
    },
    {
      path: 'deviceDispManager',
      name: 'deviceDispManager',
      component: () => import('@/views/config/deviceDispManager.vue'),
      meta: { menu_id: 'MENU043', title: 'Device 표시 관리' }
    }
  ]
}

export default deviceconfigRouter
