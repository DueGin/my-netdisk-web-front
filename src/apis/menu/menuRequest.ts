

export default function getMenuListByType(type: string): Promise<Menu[]> {
  if (type === 'media') {
    return new Promise<Menu[]>(resolve => resolve(menuOptions))
  }
  return new Promise<Menu[]>(resolve => resolve([]))
}

const menuOptions: Menu[] = [
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
  {
    label: '视频',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: 'majesticons:video-line',
    pathName: 'MediaVideo'
  },
  {
    label: '电影',
    key: 'dance-dance-dance',
    icon: 'mingcute:movie-line',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            // icon: PersonIcon
          },
          {
            label: '羊男',
            key: 'sheep-man',
            // icon: PersonIcon
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        // icon: WineIcon
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
