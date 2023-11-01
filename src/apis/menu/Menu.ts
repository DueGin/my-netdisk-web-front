interface Menu {
  label: string
  key: string
  type?: string
  children?: Array<Menu>
  disabled?: boolean
  pathName?: string
  icon?: string|Function
}
