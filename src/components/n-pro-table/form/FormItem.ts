import {Ref, UnwrapRef, VNode} from "vue";

export default class FormItem {
  prop: string
  label?: string
  formType?: 'input' | 'selection' | 'date' | 'other'
  dateType?: 'date' | 'datetime' | 'daterange' // 还有更多类型，但是需要适配
  // 展示字段为label，选中值为value
  selectionOptions?: Array<any> | Ref<UnwrapRef<Array<any>>>
  required?: boolean
  formItemRender?: (value: any) => VNode | null

  // region 样式
  formItemSlotWidth?: number | string
  labelWidth?: number
  labelAlign?: 'right' | 'left'

  // endregion 样式

  constructor(
    prop: string,
    formType?: "input" | "selection" | 'date' | 'other',
    label?: string,
    selectionOptions?: Array<any>,
    dateType?: 'date' | 'datetime' | 'daterange',
    formItemSlotWidth?: number | string,
    required?: boolean,
    formItemRender?: (value: any) => VNode | null,
    labelWidth?: number,
    labelAlign?: 'right' | 'left'
  ) {
    this.label = label;
    this.prop = prop;
    this.formType = formType;
    this.selectionOptions = selectionOptions;
    this.dateType = dateType;
    this.formItemSlotWidth = formItemSlotWidth;
    this.required = required;
    this.formItemRender = formItemRender;

    this.labelWidth = labelWidth;
    this.labelAlign = labelAlign;
  }
}

