import Request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";
import request from "@/utils/request/request.ts";

export function getDictTypePage(params: any): Promise<Result<Page>> {
  return Request.get('/sys/dictType/page', {
    params: params
  });
}

export function saveDictType(data:any):Promise<Result<any>>{
  return request.post('/sys/dictType/save', data);
}


export function updateDictType(data: any):Promise<Result<any>>{
  return request.put('/sys/dictType/update', data);
}

export function removeDictType(id: string):Promise<Result<any>>{
  return request.delete(`/sys/dictType/remove/${id}`);
}
