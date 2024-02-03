import request from "@/utils/request/request.ts";

const url = 'https://api.iconify.design';

export function getCollection(prefix?: string) {
  return request.get(url + '/collections', {
    params: {
      prefix: prefix
    }
  })
}

export function getIconListByCollectionPrefix(prefix: string) {
  return request.get(url + '/collections', {
    params: {
      prefix: prefix
    }
  })
}


export function getIconPage(iconName: string, start: number, size: number):Promise<any> {
  return request.get(url + '/search', {
    params: {
      query: iconName,
      limit: start + size,
      start: start
    },
    isNotTakeToken: true,
  } as any)
}
