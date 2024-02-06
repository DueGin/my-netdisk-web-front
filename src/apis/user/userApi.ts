import request from "@/utils/request/request.ts";
import User from "@/model/user/User.ts";


export function login(user: any): Promise<Result<User>> {
  return request.post('/user/login', user)
}

export function register(data: object): Promise<Result<any>> {
  return request.post('/user/register', data)
}

export function logout() {
  return request.get('/user/logout')
}

export function getUserDetail(): Promise<Result<any>> {
  return request.get('/user/detail')
}

export function updateUser(data: object): Promise<Result<any>> {
  return request.put('/user/update', data)
}
