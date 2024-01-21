import request from "@/utils/request/request.ts";
import User from "@/model/user/User.ts";


export function login(user: any): Promise<Result<User>> {
  return request.post('/user/login', user)
}

export function addUser() {

}
