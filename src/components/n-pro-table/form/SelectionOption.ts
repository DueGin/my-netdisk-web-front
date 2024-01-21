/**
 * 选择器选项
 */
export default class SelectionOption{
  label:string
  key: string | number
  value: any

  constructor(label: string, key: string | number, value: any) {
    this.label = label;
    this.key = key;
    this.value = value;
  }
}
