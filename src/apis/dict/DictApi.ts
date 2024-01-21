import request from "@/utils/request/request.ts";

export function getDictList(type: string):Promise<Result<Dict[]>>{
  return request.get(`/sysDict/list/${type}`)
}


export function getDictMap(type: string):Promise<Result<any>>{
  return request.get(`/sysDict/map/${type}`)
}

export function saveDictType(data:any):Promise<Result<any>>{
  return request.post('/sysDictType/save', data);
}


export function updateDictType(data: any):Promise<Result<any>>{
  return request.put('/sysDictType/update', data);
}

export function removeDictType(id: string):Promise<Result<any>>{
  return request.delete(`/sysDictType/remove/${id}`);
}
