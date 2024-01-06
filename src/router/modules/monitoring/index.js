import Layout from '@/layout'

const deviceHistoryRouter = {
  path: '/monitoring',
  name: 'monitoring',
  component: Layout,
  meta: { menu_id: 'MENU003', title: 'Device 이력' },
  children: [
    {
      path: 'deviceHistory',
      name: 'deviceHistory',
      component: () => import('@/views/monitoring/deviceHistory.vue'),
      meta: { menu_id: 'MENU031', title: 'Device 수신 이력' }
    },
    {
      path: 'deviceLastHistory',
      name: 'deviceLastHistory',
      component: () => import('@/views/monitoring/deviceLastHistory.vue'),
      meta: { menu_id: 'MENU032', title: 'Device 최종 이력' }
    },
    {
      path: 'deviceControlHistory',
      name: 'deviceControlHistory',
      component: () => import('@/views/monitoring/deviceControlHistory.vue'),
      meta: { menu_id: 'MENU033', title: 'Device 제어 이력' }
    }
  ]
}

export default deviceHistoryRouter
