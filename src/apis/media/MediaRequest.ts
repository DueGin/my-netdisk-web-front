export function getMediaList(): Promise<Result<Media[]>> {
  res.data = mediaList
  return new Promise<Result<Media[]>>(resolve => resolve(res))
}

export function getMediaListByType(type: string): Promise<Result<Media[]>> {
  res.data?.filter(v => v.type === type)
  return new Promise<Result<Media[]>>(resolve => resolve(res))
}

export function deleteMedia(ids: Array<number>): Promise<Result<Media[]>> {
  console.log(ids)
  mediaList = mediaList.filter(t=>(!ids.includes(t.id)))
  return new Promise<Result<Media[]>>(resolve => resolve(res))
}

let mediaList: Media[] = [
  {
    id: 1,
    type: 'photo',
    src: 'https://img.moehu.org/pic.php?id=acghs'
  }, {
    id: 2,
    type: 'video',
    src: '../../src/assets/Window-2023-09-22-003340.mp4'
  }, {
    id: 3,
    type: 'photo',
    src: 'https://api.oick.cn/random/api.php'
  }, {
    id: 4,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=%E5%88%80%E5%89%91%E7%A5%9E%E5%9F%9F%E6%A8%AA%E5%B1%8F%E7%B3%BB%E5%88%971'
  }, {
    id: 5,
    type: 'photo',
    src: 'https://img.xjh.me/random_img.php?return=302'
  }, {
    id: 6,
    type: 'photo',
    // src: 'https://image.anosu.top/pixiv/direct?r18=1' // r18
    src: 'https://img.moehu.org/pic.php?id=acghs'
  }, {
    id: 7,
    type: 'photo',
    src: 'http://www.98qy.com/sjbz/api.php'
  }, {
    id: 8,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate%E6%A8%AA%E5%B1%8F%E7%B3%BB%E5%88%971'
  }, {
    id: 9,
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E8%87%AA%E9%80%82%E5%BA%94%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate'
  }, {
    id: 10, // r18
    type: 'photo',
    src: 'https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=Fate%E7%AB%96%E5%B1%8F%E7%B3%BB%E5%88%971'
  },
]


const res: Result<Media[]> = {
  code: 200,
}
