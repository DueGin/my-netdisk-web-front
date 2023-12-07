import {types} from "sass";
import List = types.List;

export default interface User {
  id?: number,
  // avatar: string,
  username: string,
  password?: string,
  // phone: string,
  type?: number,
  status?: number,
  rememberMe: boolean,
  roles?: List,
  groupRoles?: List,
}
