import request from "@/utils/request/request.ts";

/**
 * 获取全部媒体 todo 添加请求参数
 */
export function getMediaList(): Promise<Result<Media[]>> {
  return request({
    url:'/media/list',
    method:'get',
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
export function deleteMedia(ids: Array<number>): Promise<Result<Media[]>> {
  return request({
    url:'/media/delete',
    method:'post',
    data: {ids: ids},
  })
}

/**
 * 获取分类下的媒体列表
 * @param classifyId 分类ID
 */
export function getMediaListByClassifyId(classifyId: number): Promise<Result<Media[]>> {
  return request({
    url:'/media/classify',
    method:'get',
    params: classifyId
  })
}


const res: Result<Media[]> = {
  code: 200,
}
