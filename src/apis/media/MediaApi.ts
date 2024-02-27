import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";
import PageDTO from "@/model/page/PageDTO.ts";


export function getMediaPage(param: any): Promise<Result<Page>> {
  return request({
    url: '/media/page',
    method: 'get',
    params: param
  })
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
 * @param page 分页
 * @param type 分类类型
 * @param classifyId 分类ID
 */
export function getMediaPageByClassifyId(page: PageDTO, type: string, classifyId: string): Promise<Result<Page>> {
  console.log(classifyId)
  return request({
    url: `/media/classify/page/${type}/${classifyId}`,
    method: 'get',
    params: page
  })
}

/**
 * 获取那年今天
 * @param limit 限制多少张图片
 */
export function getThatYearToday(limit: number | string): Promise<Result<any>> {
  return request.get(`/media/thatYearToday/${limit}`)
}

// export function downloadMedia(fileName:string){
//   return request.get(`/media/download/${fileName}`)
// }

export function downloadMedia(fileName: string) {
  let res;
  request.get(`/media/download/${fileName}`).then(r => res = r)
  return res;
}
