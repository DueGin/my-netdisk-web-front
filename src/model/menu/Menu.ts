import {VNodeChild} from "vue";

export default interface Menu {
  label: string | (() => VNodeChild)
  key: string
  type?: string
  pathName: string
  children?: Array<Menu>
  disabled?: boolean
  icon?: string | (() => VNodeChild)
}
