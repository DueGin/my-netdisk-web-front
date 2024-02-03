import {VNodeChild} from "vue";
import SelectionOption from "@/components/n-pro-table/form/SelectionOption.ts";
import FieldItem from "@/components/n-pro-table/form/FormItem.ts";

/**
 * 🐱表单修改默认会携带名为id的参数，其他需要携带的参数需要添加额外的column，如果不想显示在表格中，则将其设置为notTableColumn=true
 */
export default class NProTableColumn extends FieldItem {
  // region 数据表格
  // 字段表头
  title: string
  // key，字段名
  prop: string
  // 字段类型
  columnType?: 'common' | 'control' | 'index'
  // 子数据
  children?: NProTableColumn[]
  // 数据表格字段render
  columnDataRender?: (rowData: object, rowIndex: number) => VNodeChild
  // 字段类型为control时，编辑操作
  handleEdit?: (row: object) => void
  // 字段类型为control时，删除操作
  handleDelete?: (row: object) => void
  // 该列是否不展示在表格中(true-不展示)
  notTableColumn?: boolean
  // endregion 数据表格

  // region 数据表格样式
  align?: 'center' | 'left' | 'right'
  // 表格列宽，默认80px
  columnWidth?: number
  fixed?: 'left' | 'right' | false
  // endregion 数据表格样式

  // 是否为查询字段
  isQueryField?: boolean

  constructor(title: string,
              prop: string,
              children?: NProTableColumn[],
              label?: string,
              formType?: "input" | "selection" | "date",
              columnType?: "common" | "control" | "index",
              columnDataRender?: (rowData: object, rowIndex: number) => VNodeChild,
              align?: "center" | "left" | "right",
              columnWidth?: number,
              fixed?: 'left' | 'right' | false,
              handleEdit?: (row: object) => void,
              handleDelete?: (row: object) => void,
              notTableColumn?: boolean,
              selectionOptions?: Array<SelectionOption>,
              dateType?: "date" | "datetime" | "daterange",
              isQueryField?: boolean
  ) {
    super(prop, formType, label, selectionOptions, dateType);
    this.title = title;
    this.prop = prop;
    this.children = children;
    this.columnType = columnType ? columnType : 'common';
    this.columnDataRender = columnDataRender;
    if (columnType === 'control') {
      this.handleEdit = handleEdit ? handleEdit : () => console.log("请设置编辑操作");
      this.handleDelete = handleDelete ? handleDelete : () => console.log("请设置删除操作");
    }
    this.notTableColumn = notTableColumn;

    this.align = align ? align : 'center';
    this.columnWidth = columnWidth;
    this.fixed = fixed;
    this.isQueryField = isQueryField !== undefined ? isQueryField : false;
  }
}
