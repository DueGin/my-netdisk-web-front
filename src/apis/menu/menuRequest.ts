import Menu from "@/apis/menu/Menu.ts";

export function getMenuListByType(type: string): Promise<Result<Menu[]>> {
  if (type === 'media') {
    res.data = mediaMenuOptions
    return new Promise<Result<Menu[]>>(resolve => resolve(res))
  }
  return new Promise<Result<Menu[]>>(resolve => resolve(err))
}


const mediaMenuOptions: Menu[] = [
  {
    label: '首页',
    key: 'home',
    icon: 'tdesign:home',
    pathName: 'MediaHome'
  },
  {
    label: '照片',
    key: 'photo',
    icon: 'tabler:photo',
    disabled: false,
    pathName: 'MediaPhoto'
  },
  // {
  //   label: '视频',
  //   key: 'a-wild-sheep-chase',
  //   disabled: true,
  //   icon: 'majesticons:video-line',
  //   pathName: 'MediaVideo'
  // },
]

const res: Result<Menu[]> = {
  code: 200,
}

const err: Result<any> = {
  code: 500
}

const startMenu: Menu[] = [
  {
    label: '媒体',
    key: 'home',
    icon: 'ion:logo-apple',
    pathName: 'MediaHome',
  },
  {
    label: '登录',
    key: 'movie',
    icon: 'ion:apps',
    pathName: 'Login',
  }, {
    label: '电子书',
    key: 'book',
    icon: 'ion:logo-apple',
    pathName: 'MediaHome',
  },{
    label: 'apple',
    key: 'home',
    icon: 'ion:logo-apple',
    pathName: 'MediaHome',
  },
  {
    label: 'apps',
    key: 'home',
    icon: 'ion:apps',
    pathName: 'MediaHome',
  }, {
    label: 'apple',
    key: 'home',
    icon: 'ion:logo-apple',
    pathName: 'MediaHome',
  },

]


export function getStartMenuList(): Promise<Result<Menu[]>>{
  res.data = startMenu
  return new Promise<Result<Menu[]>>(resolve => resolve(res))
}



const headerMenu: Menu[] = [
  {
    label: '首页',
    key: 'home',
    icon: 'tdesign:home',
    pathName: 'MediaHome'
  },
  // {
  //   label: '照片',
  //   key: 'photo',
  //   icon: 'tabler:photo',
  //   disabled: false,
  //   pathName: 'MediaPhoto'
  // },
  // {
  //   label: '视频',
  //   key: 'a-wild-sheep-chase',
  //   disabled: false,
  //   icon: 'majesticons:video-line',
  //   pathName: 'MediaVideo'
  // },
]

export function getHeaderMenuList(): Promise<Result<Menu[]>>{
  res.data = headerMenu
  return new Promise<Result<Menu[]>>(resolve => resolve(res))
}

