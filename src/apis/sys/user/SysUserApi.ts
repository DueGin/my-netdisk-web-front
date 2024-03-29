import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";

export function removeUserByAdmin(id: string): Promise<Result<any>> {
  return request.delete(`/sys/user/remove/${id}`);
}

export function getUserList(params?: any): Promise<Result<Page>> {
  return request.get('/sys/user/page', {
      params: params
    }
  )
}

export function updateUserByAdmin(data: object): Promise<Result<any>> {
  return request.put('/sys/user/update', data)
}

export function saveUserByAdmin(data: object): Promise<Result<any>> {
  return request.post('/sys/user/save', data)
}
