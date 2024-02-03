import request from "@/utils/request/request.ts";

export function getRoleListByType(type: number | string):Promise<Result<any>> {
  return request.get('/sys/role/list', {
    params: {
      type: type
    }
  })
}
