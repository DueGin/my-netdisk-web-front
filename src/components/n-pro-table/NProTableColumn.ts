import {VNodeChild} from "vue";
import SelectionOption from "@/components/n-pro-table/form/SelectionOption.ts";
import FieldItem from "@/components/n-pro-table/FormItem.ts";

export default class NProTableColumn extends FieldItem {
  // region 数据表格
  // 字段表头
  title: string
  // key，字段名
  prop: string
  // 字段类型
  columnType?: 'common' | 'control' | 'index'
  // 数据表格字段render
  columnDataRender?: (rowData: object, rowIndex: number) => VNodeChild
  // 字段类型为control时，编辑操作
  handleEdit?: (row: object) => void
  // 字段类型为control时，删除操作
  handleDelete?: (row: object) => void
  // endregion 数据表格

  // region 数据表格样式
  align?: 'center' | 'left' | 'right'
  // endregion 数据表格样式

  // 是否为查询字段
  isQueryField?: boolean

  constructor(title: string,
              prop: string,
              label?: string,
              // isFormField: boolean,
              formType?: "input" | "selection" | "date",
              columnType?: "common" | "control" | "index",
              columnDataRender?: (rowData: object, rowIndex: number) => VNodeChild,
              align?: "center" | "left" | "right",
              handleEdit?: (row: object) => void,
              handleDelete?: (row: object) => void,
              selectionOptions?: Array<SelectionOption>,
              dateType?: "date" | "datetime" | "daterange",
              isQueryField?: boolean
  ) {
    super(prop, formType, label, selectionOptions, dateType);
    this.title = title;
    this.prop = prop;
    this.columnType = columnType ? columnType : 'common';
    this.columnDataRender = columnDataRender;
    if (columnType === 'control') {
      this.handleEdit = handleEdit ? handleEdit : () => console.log("请设置编辑操作");
      this.handleDelete = handleDelete ? handleDelete : () => console.log("请设置删除操作");
    }
    this.align = align ? align : 'center';
    this.isQueryField = isQueryField !== undefined ? isQueryField : false;
  }
}
