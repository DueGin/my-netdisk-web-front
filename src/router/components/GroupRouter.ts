import HeaderAndSiderLayout from "@/components/layout/headerAndSiderLayout/HeaderAndSiderLayout.vue";

const GroupRouter = {
  path: '/group',
  component: HeaderAndSiderLayout,
  meta: {
    title: '组资源',
  },
  children: [
    {
      path: 'info',
      name: 'GroupInfo',
      component: () => import('@/views/group/groupInfo/index.vue'),
    },
    {
      path: 'resource',
      name: 'GroupResource',
      component: () => import('@/views/group/resource/index.vue'),
    },
    {
      path: 'manager',
      name: 'GroupManager',
      component: () => import('@/views/group/manager/index.vue'),
    },
  ]
}

export default GroupRouter
