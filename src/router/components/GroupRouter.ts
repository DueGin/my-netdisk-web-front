import HeaderAndSiderLayout from "@/components/layout/headerAndSiderLayout/HeaderAndSiderLayout.vue";

const GroupRouter = {
  path: '/group',
  name: 'Group',
  component: HeaderAndSiderLayout,
  meta: {
    title: '组资源',
  },
  children: [
    {
      path: 'detail',
      name: 'GroupDetail',
      component: () => import('@/views/group/groupDetail/GroupDetail.vue'),
    },
  ]
}

export default GroupRouter
