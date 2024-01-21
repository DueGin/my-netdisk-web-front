import {types} from "sass";
import List = types.List;

export default interface User {
  id?: number,
  // avatar: string,
  username: string,
  password?: string,
  phone?: string,
  status?: number,
  rememberMe: boolean,
  sysRole?: string,
  groupRoleList?: List,
}
