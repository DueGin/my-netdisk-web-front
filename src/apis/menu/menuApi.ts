import Menu from "@/model/menu/Menu.ts";
import request from "@/utils/request/request.ts";
// 根据菜单类型值获取左侧菜单列表
export function getMenuListByType(type: number): Promise<Result<Menu[]>> {
  // if (type) {
  //   res.data = mediaMenuOptions
  //   return new Promise<Result<Menu[]>>(resolve => resolve(res))
  // }
  // return new Promise<Result<Menu[]>>(resolve => resolve(err))

  return request.get(`/menu/list/${type}`);
}

export function getMenuTreeList(){
  return request.get('/menu/tree');
}

export function getMenuMap(): Promise<Result<any>> {
  return request.get('/menu/map');
}


const mediaMenuOptions: Menu[] = [
  {
    label: '首页',
    key: 'home',
    icon: 'tdesign:home',
    path: 'MediaHome'
  },
  {
    label: '全部',
    key: 'mediaAll',
    icon: 'tabler:photo',
    disabled: false,
    path: 'MediaAll'
  },
  {
    label: '地点',
    key: 'place',
    disabled: false,
    icon: 'ep:place',
    path: 'MediaPlace'
  },
  {
    label: '分类',
    key: 'classify',
    disabled: false,
    icon: 'mingcute:classify-add-2-line',
    path: 'MediaClassify'
  },

]

const res: Result<Menu[]> = {
  code: 200,
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
    label: '首页',
    key: 'book',
    icon: 'ion:logo-apple',
    pathName: 'Index',
  }, {
    label: '用户管理',
    key: 'book',
    icon: 'ion:logo-apple',
    pathName: 'UserManager',
  },{
    label: '组管理',
    key: 'book',
    icon: 'ion:logo-apple',
    pathName: 'GroupManager',
  },{
    label: '资源组',
    key: 'book',
    icon: 'ion:logo-apple',
    pathName: 'GroupHome',
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
    path: 'MediaHome'
  },
  // {
  //   label: '照片',
  //   key: 'photo',
  //   icon: 'tabler:photo',
  //   disabled: false,
  //   path: 'MediaPhoto'
  // },
  // {
  //   label: '视频',
  //   key: 'a-wild-sheep-chase',
  //   disabled: false,
  //   icon: 'majesticons:video-line',
  //   path: 'MediaVideo'
  // },
]

export function getHeaderMenuList(): Promise<Result<Menu[]>>{
  res.data = headerMenu
  return new Promise<Result<Menu[]>>(resolve => resolve(res))
}

