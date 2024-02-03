import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";

/**
 * 获取全部媒体 todo 添加请求参数
 */
export function getMediaList(): Promise<Result<Media[]>> {
  return request({
    url: '/media/list',
    method: 'get',
  })
}

export function getMediaPage(param: any): Promise<Result<Page>> {
  return request({
    url: '/media/page',
    method: 'get',
    params: param
  })
}

export function getMediaListByType(type: string): Promise<Result<Media[]>> {
  res.data?.filter(v => v.type === type)
  return new Promise<Result<Media[]>>(resolve => resolve(res))
}

/**
 * 删除媒体
 * @param ids 媒体ID
 */
export function deleteMedia(ids: any): Promise<Result<Media[]>> {
  return request({
    url: '/media/remove',
    method: 'post',
    data: JSON.stringify(ids),
  })
}

/**
 * 获取分类下的媒体列表
 * @param type 分类类型
 * @param classifyId 分类ID
 */
export function getMediaListByClassifyId(type: string, classifyId: string): Promise<Result<Media[]>> {
  console.log(classifyId)
  return request({
    url: `/media/classify/list/${type}/${classifyId}`,
    method: 'get',
  })
}


const res: Result<Media[]> = {
  code: 200,
}
