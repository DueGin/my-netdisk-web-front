<template>

  <n-pro-form
      :formFields="queryFormList"
      :formData="queryForm"
      :inline="true"
      formType="queryForm"
      :formKey="queryFormKey"
      @resetForm="resetQueryForm"
      @getListApi="$emit('getListApi', queryForm)"
  />


  <div style="margin-bottom: 1rem" v-if="addButtonName && addButtonName !== ''">
    <n-button
        v-if="addButtonName && addButtonName !== ''"
        type="info"
        :size="size"
        @click="onSave('保存', addButtonName, 'handleSave')"
    >
      新增{{ addButtonName }}
    </n-button>
  </div>


  <n-data-table
      :columns="processedColumns"
      :data="tableData"
      :pagination="false"
      align="center"
      striped
      style="margin-bottom: 2rem"
      :size="size"
  />


  <n-pagination
      v-model:page="pagination.pageNumber"
      v-model:page-size="pagination.pageSize"
      :item-count="pagination.totalRow"
      :page-sizes="<Array<number>>pageSizes"
      show-size-picker
      :size="size"
  />
</template>

<script setup lang="ts">

import Page from "@/model/result/Page.ts";
import {computed, ref, reactive, toRaw, h, watch} from "vue";
import {DialogReactive, NButton} from "naive-ui";
import Pagination from "@/components/n-pro-table/Pagination.ts";
import {dialog, notification} from "@/utils/tip/TipUtil.ts";
import FormItem from "@/components/n-pro-table/FormItem.ts";
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
  pagination: Pagination,
  // 页大小选项
  pageSizes?: Array<any>,
  // 添加xx按钮的xx
  addButtonName: String,
  // 表格、表单大小
  size: NProTableSize,

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
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalRow: 0
  },
  pageSizes: [10, 20, 30, 50],
  size: NProTableSize.medium
})

console.log(props.columns, props.tableData)

const emits = defineEmits<{
  // 只负责调用，不负责赋值
  (e: 'getListApi', param: any): any,
  (e: 'handleSave', formData: object, cb: (resPromise: Promise<Result<any>>) => any): any,
  (e: 'handleModify', formData: object, cb: (resPromise: Promise<Result<any>>) => any): any,
  (e: 'handleRemove', id: string, cb: (resPromise: Promise<Result<any>>) => any): any,
}>();

const Columns = computed({
  get: () => {
    // 处理columns
    let columns = <Array<any>>props.columns;
    columns.forEach(c => {
      // 设置默认为列居中
      c.align = c.align ? c.align : 'center';
    })
    return columns;
  },
  set: (v) => {

  }
})


// 刷新form的UI
const queryFormKey = ref(0)


// 处理后的n-table表头
const processedColumns = ref([]);
// 表单项列表
const formItemList = ref<FormItem[]>([]);
// 查询表单项列表
const queryFormList = ref<FormItem[]>([]);
const handleTitleOrLabel = (column: NProTableColumn) => {
  return column.title ? column.title : column.label;
}
// 处理props.columns
const handleColumns = () => {
  let columns = <Array<NProTableColumn>>props.columns;
  // 处理后的n-table表头
  let cols = [];
  // 表单列表
  let formItems: FormItem[] = [];
  // 查询表单列表
  let queryForms: FormItem[] = [];

  columns.forEach(column => {
    // 表头
    let c = {
      title: handleTitleOrLabel(column),
      key: column.prop,
      render: column.columnDataRender,
      align: column.align ? column.align : 'center'
    }
    // 列类型为control 且 列数据render不为undefined才设置默认的
    if (column.columnType === 'control' && !column.columnDataRender) {
      c.render = (row) => h(TableActions, {
        handleEdit: () => {
          console.log("edit", row);
          onSave('编辑', props.addButtonName, 'handleModify', row);
          // column.handleEdit ? column.handleEdit(row) : console.log("请设置编辑操作");
        },
        handleDelete: () => {
          console.log("delete", row);
          // column.handleDelete ? column.handleDelete(row) : console.log("请设置编辑操作");
          onDelete(row);
        }
      })
    }
    cols.push(c)

    if (column.formType) {
      // 新增或修改表单
      let form: FormItem = <FormItem>column;
      form.label = handleTitleOrLabel(column);
      form.required = column.required;
      formItems.push(form);

      // 查询表单
      if (column.isQueryField) {
        let queryForm = <FormItem>column;
        queryForm.label = handleTitleOrLabel(column);
        queryForms.push(queryForm);
      }

    }

  });

  // 表头
  processedColumns.value = cols;
  // 表单
  formItemList.value = formItems;
  // 查询表单
  queryFormList.value = queryForms;
  console.log(cols, formItems, queryForms);
}
// handleColumns();
watch(props.columns, () => {
  handleColumns();
}, {immediate: true})

// 查询表单
const queryForm = ref({
  pageSize: <Pagination>props.pagination?.pageSize,
  pageNumber: <Pagination>props.pagination?.pageNumber
});
const getList = () => {
  // 查询列表
  emits('getListApi', queryForm.value);
}
getList();


// 重置查询表单
const resetQueryForm = () => {
  console.log("reset form")
  queryForm.value = {
    pageSize: <Pagination>props.pagination?.pageSize,
    pageNumber: <Pagination>props.pagination?.pageNumber
  }

  queryFormKey.value++;
}


// 点击新增按钮
const editFormKey = ref(0);
let dialogKey = ref(0);
watch(dialogKey, () => {
  console.log("close")
  closeDialog()
})
let currentDialog;
const closeDialog = () => {
  currentDialog?.destroy();
}
const formData = ref({})
const onSave = (control: string, formName: string, handleSaveEmit: 'handleSave' | 'handleModify', data?: object) => {
  console.log(data);
  if (handleSaveEmit === 'handleModify' && data) {
    formData.value = data;
  }
  currentDialog = dialog.create({
    // title: `新增${props.addButtonName}`,
    title: control + formName,
    showIcon: false,
    content: () => h(NProForm, {
      formFields: formItemList.value,
      formData: formData.value,
      formKey: editFormKey,
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
      ['onHandleSave']: (form) => {
        // @ts-ignore
        emits(handleSaveEmit, form, (resPromise) => {
          resPromise.then(res => {
            if (res.code === 200) {
              notification.success({
                title: `${control}成功！`,
                content: `🧐让我看看你都${control}了些啥`,
                duration: 1288
              });
              dialogKey.value++;
              // 重置表单
              formData.value = {}
              // 重新获取列表
              emits('getListApi', queryForm.value);
            } else {
              notification.error({
                title: `${control}失败！`,
                content: `歪，是你操作失误还是我又写bug了，${res.msg}`,
                duration: 1288
              });
            }
          }).catch(err => {
            console.error(err);
            notification.error({
              title: `${control}失败！`,
              content: `歪，是你操作失误还是我又写bug了，${err}`,
              duration: 1288
            });
          });
        });
      },

    }),

  });

}

const onDelete = (data) => {
  dialog.create({
    title: '谨慎操作',
    content: '确定删除吗？',
    negativeText: '不删了',
    positiveText: '删了吧',
    onPositiveClick: () => {
      emits('handleRemove', data.id, resPromise => {
        resPromise.then(res => {
          if (res.code === 200) {
            notification.success({
              title: '删除成功',
              content: '🧹又清理了一个垃圾',
              duration: 1288
            });
            emits('getListApi', queryForm.value);
          }
        }).catch(err => {
          console.error(err);
          notification.error({
            title: '🧹删除失败，',
            content: `啥垃圾啊，这么难清理，${err}`,
            duration: 1288
          });
        })
      });
    }
  })
}


</script>

<style scoped>

</style>
