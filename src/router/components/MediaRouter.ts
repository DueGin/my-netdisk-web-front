import HeaderAndSiderLayout from "@/components/layout/headerAndSiderLayout/HeaderAndSiderLayout.vue";

const MediaRouter = {
  path: '/media',
  name: 'Media',
  component: HeaderAndSiderLayout,
  redirect: '/media/home',
  meta: {
    title: '媒体',
  },
  children: [
    {
      path: 'home',
      name: 'MediaHome',
      component: () => import('@/views/media/index.vue'),
    }, {
      path: 'mediaAll',
      name: 'MediaAll',
      component: () => import('@/views/media/MediaAll.vue'),
    },
    {
      path: 'place',
      name: 'MediaPlace',
      component: () => import('@/views/media/MediaPlace.vue'),
    },
    {
      path: 'classify',
      name: 'MediaClassify',
      component: () => import('@/views/media/classify/MediaClassify.vue'),
    },
    {
      path: 'classify/list',
      name: 'MediaClassifyList',
      component: () => import('@/views/media/classify/MediaClassifyList.vue'),
    },
  ]
}

export default MediaRouter
