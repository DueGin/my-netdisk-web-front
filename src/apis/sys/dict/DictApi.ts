import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";

export function getDictMap(type: string): Promise<Result<any>> {
  return request.get(`/sys/dict/map/${type}`)
}

export function getDictList(type: string): Promise<Result<Dict[]>> {
  return request.get(`/sys/dict/list/${type}`)
}

export function getDictPage(params: any): Promise<Result<Page>> {
  return request.get('/sys/dict/page', {params: params})
}

export function saveDict(data: any): Promise<Result<any>>{
  return request.post('/sys/dict/save', data);
}

export function updateDict(data:any): Promise<Result<any>>{
  return request.put('/sys/dict/update', data);
}

export function removeDict(id: any):Promise<Result<any>>{
  return request.delete(`/sys/dict/remove/${id}`);
}
