import Menu from "@/model/menu/Menu.ts";
import request from "@/utils/request/request.ts";

// 根据菜单类型值获取左侧菜单列表
export function getMenuListByType(type: string): Promise<Result<Menu[]>> {
  return request.get(`/menu/list/${type}`);
}

export function saveMenu(data: any): Promise<Result<any>> {
  return request.post('/menu/save', data);
}

export function updateMenu(data: any): Promise<Result<any>> {
  return request.put('/menu/update', data);
}

export function removeMenu(id: string): Promise<Result<any>> {
  return request.delete(`/menu/remove/${id}`);
}

export function getUserMenuMap(): Promise<Result<any>> {
  return request.get('/menu/map/user');
}

export function getMenuFlatMap():Promise<Result<any>> {
  return request.get('/menu/router');
}

