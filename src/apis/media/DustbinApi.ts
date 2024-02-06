import PageDTO from "@/model/page/PageDTO.ts";
import Page from "@/model/page/Page.ts";
import request from "@/utils/request/request.ts";

export function getDustbinPage(page: PageDTO): Promise<Result<Page>> {
  return request({
    url: '/media/dustbin/page',
    method: 'get',
    params: page
  })
}

export function removeDustbin(ids: string[]): Promise<Result<Page>> {
  return request.post('/media/dustbin/remove', JSON.stringify(ids))
}
