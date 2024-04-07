import PageDTO from "@/model/page/PageDTO.ts";
import Page from "@/model/page/Page.ts";
import request from "@/utils/request/request.ts";
import {FileTypeConstant} from "@/constants/FileTypeConstant.ts";

export function getDustbinPage(page: any | PageDTO): Promise<Result<Page>> {
  return request({
    url: '/media/dustbin/page',
    method: 'get',
    params: page
  })
}

export function removeDustbin(ids: string[], fileType: FileTypeConstant): Promise<Result<any>> {
  return request.post('/media/dustbin/remove', {
    ids: ids,
    fileType: fileType
  })
}

/**
 * 还原在垃圾桶中的媒体资源
 * @param ids 垃圾箱主键集合
 */
export function rebornDustbin(ids: string[]): Promise<Result<any>> {
  return request.post('/media/dustbin/reborn', JSON.stringify(ids))
}
