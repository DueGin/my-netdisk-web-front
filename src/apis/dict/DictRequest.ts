import request from "@/utils/request/request.ts";

export function getDictList(type: string):Promise<Result<Dict[]>>{
  return request.get(`/sysDict/list/${type}`)
}


export function getDictMap(type: string):Promise<Result<any>>{
  return request.get(`/sysDict/map/${type}`)
}

