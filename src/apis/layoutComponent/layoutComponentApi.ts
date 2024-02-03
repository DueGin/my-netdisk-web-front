import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";

export function getLayoutComponentPage(param: any): Promise<Result<Page>> {
  return request.get('/sys/layoutComponent/page', {params: param})
}

export function getLayoutComponentList(): Promise<Result<any>> {
  return request.get('/sys/layoutComponent/list')
}

export function getLayoutComponentMap(ids?: Array<any> | string): Promise<Result<any>> {
  let idsStr: string | undefined = undefined;
  if (typeof ids !== "undefined") {
    if (ids instanceof Array) {
      idsStr = '';
      ids.forEach(id => {
        idsStr += id + ","
      })
      idsStr = idsStr.substring(0, idsStr.length - 2);
    }
  }
  return request.get('/sys/layoutComponent/map', {
    params: {
      idsStr: idsStr
    }
  })
}

export function saveLayoutComponent(data: any): Promise<Result<any>> {
  return request.post('/sys/layoutComponent/save', data)
}


export function updateLayoutComponent(data: any): Promise<Result<any>> {
  return request.put('/sys/layoutComponent/update', data)
}

export function removeLayoutComponent(id: string): Promise<Result<any>> {
  return request.delete(`/sys/layoutComponent/remove/${id}`)
}

