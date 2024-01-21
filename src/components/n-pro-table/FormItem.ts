export default class FieldItem {
  prop: string
  label?: string
  formType?: 'input' | 'selection' | 'date'
  selectionOptions?: Array<any>
  dateType?: 'date' | 'datetime' | 'daterange' // 还有更多类型，但是需要适配
  width?: number | string
  required?: boolean

  constructor(
    prop: string,
    formType?: "input" | "selection" | 'date',
    label?: string,
    selectionOptions?: Array<any>,
    dateType?: 'date' | 'datetime' | 'daterange',
    width?: number | string,
    required?: boolean
  ) {
    this.label = label;
    this.prop = prop;
    this.formType = formType;
    this.selectionOptions = selectionOptions;
    this.dateType = dateType;
    this.width = width;
    this.required = required
  }
}

