import request from "@/utils/request/request.ts";

export function deleteUser(id: string): Promise<Result<any>> {
  return request.delete(`/sys/user/${id}`);
}

export function getUserList(params?: any): Promise<Result<any>> {
  return request.get('/sys/user/page', {
      params: params
    }
  )
}
