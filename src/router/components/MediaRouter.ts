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
      path: 'photo',
      name: 'MediaPhoto',
      component: () => import('@/views/media/MediaList.vue'),
    },
    // {
    //   path: 'video',
    //   name: 'MediaVideo',
    //   component: () => import('@/views/media/MediaList.vue'),
    // },
  ]
}

export default MediaRouter
