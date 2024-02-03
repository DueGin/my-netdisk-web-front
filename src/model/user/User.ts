export default interface User {
  id?: number,
  // avatar: string,
  username: string,
  avatar?:string,
  avatarUrl?:string,
  password?: string,
  phone?: string,
  status?: number,
  rememberMe: boolean,
  sysRole?: string,
  groupRoleList?: Array<any>,
}
