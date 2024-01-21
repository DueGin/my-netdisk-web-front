import {VNodeChild} from "vue";

export default interface Menu {
  id?: number,
  name?: string | undefined
  path?: string
  icon?: string | (() => VNodeChild)
  // label: string | (() => VNodeChild)
  key?: string
  type?: string
  typeName?:string
  pathName?: string
  childrenList?: Array<Menu>
  disabled?: boolean,
  sorted?:number,
  remark?:string
}
