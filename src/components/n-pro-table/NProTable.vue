<template>

  <n-pro-form
      :formFields="queryFormList"
      :formData="queryForm"
      :inline="true"
      formType="queryForm"
      :formKey="queryFormKey"
      @resetForm="resetQueryForm"
      @handle-submit="$emit('getListApi', queryForm)"
  />


  <div style="margin-bottom: 1rem" v-if="name && name !== ''">
    <n-button
        v-if="name && name !== ''"
        type="info"
        :size="size ? size : NProTableSize.medium"
        @click="onSave('保存', name, 'handleSave')"
    >
      新增{{ name }}
    </n-button>
  </div>


  <n-data-table
      :columns="processedColumns"
      :data="TableData"
      :pagination="false"
      striped
      resizable
      style="margin-bottom: 2rem"
      :size="size ? size : NProTableSize.medium"
      :scroll-x="scrollX"
      children-key="children"
  />


  <n-pagination
      v-if="pagination"
      v-model:page="pagination.pageNumber"
      v-model:page-size="pagination.pageSize"
      :item-count="pagination.totalRow"
      :page-sizes="<Array<number>>pageSizes"
      show-size-picker
      :size="size ? size : NProTableSize.medium"
  />
</template>

<script setup lang="ts">

import {computed, ref, reactive, toRaw, h, watch, toRef} from "vue";
import {DialogReactive, NButton} from "naive-ui";
import Pagination from "@/components/n-pro-table/Pagination.ts";
import {dialog, notification} from "@/utils/tip/TipUtil.ts";
import FormItem from "@/components/n-pro-table/form/FormItem.ts";
import NProForm from "@/components/n-pro-table/form/NProForm.vue";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import TableActions from "@/components/tableActions/TableActions.vue";
import {NProTableSize} from "@/components/n-pro-table/NProTableSize.ts";

interface Props {
  // 表头
  columns: NProTableColumn[],
  // 表格数据
  tableData: Array<any>,
  // 分页
  pagination?: Pagination,
  // 页大小选项
  pageSizes?: Array<any>,
  // 添加xx按钮的xx
  name: String,
  // 表格、表单大小
  size?: NProTableSize,
}

// const props = defineProps<Props>();
// const {
//   columns = props.columns ? props.columns : [],
//   pagination = props.pagination ? props.pagination : {
//     pageNumber: 1,
//     pageSize: 10,
//     totalRow: 0
//   },
//   pageSizes = props.pageSizes ? props.pageSizes : [10, 20, 30, 50],
//   size = props.size ? props.size : NProTableSize.medium
// } = props;

// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  pageSizes: [10, 20, 30, 50],
  size: NProTableSize.medium
})


// 空数据的显示
const emptyDataShow = '--'


// region 事件
const emits = defineEmits<{
  // 只负责调用，不负责赋值
  (e: 'getListApi', param: any): any,
  (e: 'handleSave', formData: object, cb: (resPromise: Promise<Result<any>>) => any): any,
  (e: 'handleUpdate', formData: object, cb: (resPromise: Promise<Result<any>>) => any): any,
  (e: 'handleRemove', id: string, cb: (resPromise: Promise<Result<any>>) => any): any,
}>();
// endregion 事件

// 刷新form的UI
const queryFormKey = ref(0)

// region 处理表列属性
// 表宽
const scrollX = ref(2300);
// 处理后的n-table表头
const processedColumns = ref([]);
// 表单项列表
let formItemList = ref<FormItem[]>([]);
// 查询表单项列表
let queryFormList = ref<FormItem[]>([]);
const handleTitleOrLabel = (column: NProTableColumn) => {
  return column.title ? column.title : column.label;
}
// 处理props.columns
const handleColumns = () => {
  let columns = <Array<NProTableColumn>>props.columns;
  // 处理后的n-table表头
  let cols = [];
  // 表单列表
  let formItems = ref<FormItem[]>([]);
  // 查询表单列表
  let queryForms = ref<FormItem[]>([]);
  // 表宽
  let tableWidth = 0;
  columns.forEach(column => {

    // 该列为表格列
    if (column.notTableColumn === undefined || !column.notTableColumn) {
      // 表头
      let c: any = {
        title: handleTitleOrLabel(column),
        key: column.prop,
        render: column.columnDataRender,
        align: column.align ? column.align : 'center',
        width: column.columnWidth ? column.columnWidth : 80,
        fixed: column.fixed,
      }

      // 列类型为control 且 列数据render不为undefined才设置默认的
      if (column.columnType === 'control' && !column.columnDataRender) {
        c.render = (row) => h(TableActions, {
          handleEdit: () => {
            console.log("edit", row);
            let rowData = JSON.parse(JSON.stringify(row));
            // 把数据转换回去
            for (let rowKey in rowData) {
              if (rowData[rowKey] === emptyDataShow) {
                rowData[rowKey] = undefined;
              }
            }
            console.log(rowData)
            onSave('编辑', props.name, 'handleUpdate', rowData);
          },
          handleDelete: () => {
            console.log("delete", row);
            onDelete(row);
          }
        })
      } else if (column.columnType === 'index' && !column.columnDataRender) {
        let idx = 1;
        c.render = () => idx++;
        c.width = 50;
      }

      // 表总宽
      tableWidth += c.width;

      cols.push(c)
    }

    // 存在表单类型才加入表单
    if (column.formType) {
      // 新增或修改表单
      let form: FormItem = <FormItem>column;
      form.label = handleTitleOrLabel(column);
      form.required = column.required;
      formItems.value.push(toRef(form).value);

      // 查询表单
      if (column.isQueryField) {
        let queryForm = <FormItem>column;
        queryForm.label = handleTitleOrLabel(column);
        queryForms.value.push(toRef(queryForm).value);
      }

    }

  });

  // 表总宽
  scrollX.value = tableWidth;
  console.log(scrollX)
  // 表头
  processedColumns.value = cols;
  // 表单
  formItemList = formItems;
  // 查询表单
  queryFormList = queryForms;
  console.log(cols, formItems, queryForms);
}
// 监听props的列数据，进行处理
watch(() => props.columns, () => {
  handleColumns();
}, {immediate: true})
// endregion 处理表列属性

// 查询表单
const queryForm = ref({
  pageSize: props.pagination && props.pagination.pageSize ? props.pagination.pageSize : -1,
  pageNumber: props.pagination && props.pagination.pageNumber ? props.pagination.pageNumber : undefined
});
const getList = () => {
  // 查询列表
  emits('getListApi', queryForm.value);
}
getList();

// region 处理表格数据
const TableData = computed(() => {
  props.tableData.forEach(data => {
    // 处理为null的数据 todo 根据列来判断处理，icon那种带render的不处理
    for (let dataKey in data) {
      let column = props.columns.find(c => c.prop === dataKey);

      if ((data[dataKey] === undefined || data[dataKey] === null) && column && !column.columnDataRender) {
        data[dataKey] = emptyDataShow;
      }
    }
  })
  console.log("表格数据", props.tableData)
  return <Array<object>>props.tableData;
})
// endregion 处理表格数据

// 监听分页
watch(() => props.pagination, () => {
  emits('getListApi', queryForm)
})

// region 重置查询表单
const resetQueryForm = () => {
  console.log("reset form")
  queryForm.value = {
    pageSize: props.pagination && props.pagination.pageSize ? props.pagination.pageSize : -1,
    pageNumber: props.pagination && props.pagination.pageNumber ? props.pagination.pageNumber : undefined
  }

  queryFormKey.value++;
}
// endregion 重置查询表单


// region 点击新增按钮
const editFormKey = ref(0);
let dialogDeleteKey = ref(0);
// 监听dialogDeleteKey，执行关闭dialog
watch(dialogDeleteKey, () => {
  console.log("close")
  closeDialog()
})
let currentDialog;
// 关掉当前dialog
const closeDialog = () => {
  currentDialog?.destroy();
}
const formData = ref({})
const onSave = (control: string, formName: string, handleSaveEmit: 'handleSave' | 'handleUpdate', data?: object) => {
  console.log(data);
  if (handleSaveEmit === 'handleUpdate' && data) {
    // 过滤表单字段，不填写的不提交
    let tFormData:any = {};
    formItemList.value.forEach(item => {
      tFormData[item.prop] = data[item.prop]
    })
    // 默认会携带名为id的参数
    tFormData.id = data.id;
    formData.value = tFormData;
  }
  // 打开dialog
  currentDialog = dialog.create({
    title: control + formName,
    showIcon: false,
    content: () => h(NProForm, {
      formFields: formItemList.value,
      formData: formData.value,
      formKey: editFormKey.value,
      ['onUpdate:formData']: v => {
        console.log(v)
        formData.value = v;
      },
      // 重置表单操作
      ['onResetForm']: (formData) => {
        console.log(formData)
        formData.value = {};
        editFormKey.value++;
      },
      // 保存操作
      ['onHandleSubmit']: (form) => {
        // @ts-ignore
        emits(handleSaveEmit, form, (resPromise) => {
          resPromise.then(res => {
            notification.success({
              title: `${control}成功！`,
              content: `🧐让我看看你都${control}了些啥`,
              duration: 1288
            });
            dialogDeleteKey.value++;
            // 重置表单
            formData.value = {}
            // 重新获取列表
            emits('getListApi', queryForm.value);
          }).catch(err => {
            console.error(err);
            notification.error({
              title: `${control}失败！`,
              content: err.msg ? err.msg : '歪，是你操作失误还是我又写bug了',
              duration: 1688
            });
          });
        });
      },

    }),
    onAfterLeave: () => {
      // 重置表单
      formData.value = {};
      // editFormKey.value++;
    }
  });

}
// endregion 点击新增按钮

// region 点击删除按钮
const onDelete = (data) => {
  dialog.create({
    icon: '🚮',
    title: '确定删除吗？',
    content: '我不知道他们会去往哪里，但我希望他们能有个好的归宿',
    negativeText: '🤔容我再想想',
    positiveText: '😑早就想删了',
    onPositiveClick: () => {
      emits('handleRemove', data.id, resPromise => {
        resPromise.then(res => {
          notification.success({
            title: '删除成功',
            content: '又清理了一个垃圾',
            duration: 1288
          });
          emits('getListApi', queryForm.value);
        }).catch(err => {
          console.error(err);
          notification.error({
            title: '🧹删除失败，',
            content: err.msg ? err.msg : '啥垃圾啊，这么难清理',
            duration: 1688
          });
        })
      });
    }
  })
}
// endregion 点击删除按钮


console.log('表格名称：', props.name, '表格列属性：', props.columns)
</script>

<style scoped>

</style>
