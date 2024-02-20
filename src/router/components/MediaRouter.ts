import HeaderAndSiderLayout from "@/components/layout/headerAndSiderLayout/HeaderAndSiderLayout.vue";

const MediaRouter = {
  path: '/',
  name: '',
  component: HeaderAndSiderLayout,
  redirect: '/media/home',
  meta: {
    title: '媒体',
  },
  children: [
    {
      path: 'media/home',
      name: 'MediaHome',
      component: () => import('@/views/media/index.vue'),
    }, {
      path: 'media/mediaAll',
      name: 'MediaAll',
      component: () => import('@/views/media/MediaAll.vue'),
    },
    {
      path: 'place',
      name: 'MediaPlace',
      component: () => import('@/views/media/MediaPlace.vue'),
    },
    {
      path: 'classify/list',
      name: 'MediaClassifyList',
      component: () => import('@/views/media/classify/MediaClassifyList.vue'),
    },
  ]
}

export default MediaRouter
