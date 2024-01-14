import request from "@/utils/request/request.ts";

export function getUserGroupList(): Promise<Result<any>> {
  return request.get('/group/user_group_list')
}

export function addGroup(data: any): Promise<Result<any>> {
  return request.post('/group/create', data)
}

export function getGroupInfoById(id: any){
  return request.get(`/group/info/${id}`)
}

export function updateGroupInfo(group:any){
  return request.put('/group/modify', group)
}
