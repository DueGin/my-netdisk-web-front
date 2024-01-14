import {VNodeChild} from "vue";

export default interface Menu {
  name?: string | undefined
  label: string | (() => VNodeChild)
  key: string
  type?: string
  path?: string
  pathName?: string
  childrenList?: Array<Menu>
  disabled?: boolean
  icon?: string | (() => VNodeChild)
}
