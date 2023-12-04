import request from "@/utils/request/request.ts";


export function login(user:any): Promise<Result<void>> {
  return request.post('/user/login', user)
}

export function addUser() {

}
