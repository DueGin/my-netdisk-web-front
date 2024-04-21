<template>
  <div class="app-container">
    <n-tabs
        animated
        type="line"
        v-model:value="menuTypeValue"
        @update:value="onTabChange"
    >
      <n-tab
          v-for="tab in menuType"
          :label="tab.label"
          :key="tab.value"
          :name="<string>tab.value"
      />
    </n-tabs>
    <n-pro-table
        name="菜单"
        :table-key="tableKey"
        :columns="menuTypeValue !== '5' ? columns : startMenuColumns"
        :table-data="data"
        @getListApi="getMenuList"
        @handle-save="handleSave"
        @handle-update="handleUpdate"
        @handle-remove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import {h, ref} from "vue";
import {renderIcon} from "@/utils/render/IconRender.ts";
import NProTable from "@/components/n-pro-table/NProTable.vue";
import NProTableColumn from "@/components/n-pro-table/NProTableColumn.ts";
import {getMenuListByType, removeMenu, saveMenu, updateMenu} from "@/apis/menu/menuApi.ts";
import {getDictList} from "@/apis/sys/dict/DictApi.ts";
import {NTag, NTreeSelect} from "naive-ui";
import {getRoleListByType} from "@/apis/sys/role/RoleApi.ts";
import {getLayoutComponentList} from "@/apis/layoutComponent/layoutComponentApi.ts";
import {selectStatusOptions} from "@/utils/option/OptionUtil.ts";
import IconSelector from "@/components/iconSelector/IconSelector.vue";

const icon = ref('');
const tableKey = ref(0);

// region 标签页，菜单类型
const menuTypeValue = ref('3');
const menuType = ref([]);
const getMenuTypeList = () => {
  getDictList('menu').then(res => {
    if (res.code === 200 && res.data) {
      (<any[]>res.data).forEach(d => {
        menuType.value.push({
          label: d.label,
          value: d.id
        });
      })
    }
  })
}
getMenuTypeList();
const onTabChange = (v) => {
  getMenuList()
}


// endregion 标签页，菜单类型

let roleList = ref([]);
const getRoleList = () => {
  getRoleListByType(1).then(res => {
    if (res.code === 200) {
      let roles = [];
      res.data.forEach(r => {
        let role = {
          label: r.description,
          value: r.id
        }
        roles.push(role);
      })
      roleList.value = roles;
    }
  })
}
getRoleList();


// 布局组件列表
const layoutComponentList = ref([]);
getLayoutComponentList().then(res => {
  if (res.code === 200 && res.data) {
    let layoutComponents = [];
    res.data.forEach(l => {
      let layoutComponent = {
        label: l.remark,
        value: l.id
      }
      layoutComponents.push(layoutComponent);
    })
    layoutComponentList.value = layoutComponents;
  }
})

// 菜单树
let menuTree = [];

// 图标选项列表

// icon 选择器
const iconSelector = (value) => h(IconSelector, {
  value: value,
  style: {
    width: '13rem'
  }
})

const data = ref([]);
const getMenuList = () => {
  getMenuListByType(menuTypeValue.value).then(res => {
    if (res.code === 200 && res.data) {
      data.value = res.data;
      let menus = [];
      res.data.forEach(m => {
        let menuOpt = {
          label: m.name,
          key: m.id,
          children: []
        }
        if (m.children) {
          menuOpt.children = handleChildMenuOpt(m.children);
        }
        menus.push(menuOpt);
      })
      console.log(menus)
      let root = {
        label: '根菜单',
        key: 0,
        children: menus
      }
      menuTree = [root];
      tableKey.value++;
    }
  })
}

// region 列
const columns = ref<NProTableColumn[]>([
  {
    title: '图标',
    prop: 'icon',
    formType: 'other',
    columnDataRender: (rowData, rowIndex) => renderIcon(rowData.icon),
    formItemRender: (value) => iconSelector(value)
  },
  {
    title: '名称',
    prop: 'name',
    formType: 'input',
    required: true
  },
  {
    title: '父菜单',
    prop: 'parentId',
    notTableColumn: true,
    formType: 'other',
    formItemRender: (value) => h(NTreeSelect, {
      defaultExpandedKeys: [0],
      clearable: true,
      placeholder: '请选择父级菜单',
      options: menuTree,
      value: value,
      filterable: true,
      style: {
        width: '13rem'
      },
    })
  },
  {
    title: '路由',
    prop: 'path',
    formType: 'input',
    required: true
  },
  {
    title: '组件名称',
    prop: 'componentName',
    formType: 'input',
    required: true
  },
  {
    title: '组件路径',
    prop: 'componentPath',
    formType: 'input',
    required: true
  },
  {
    title: '布局组件',
    prop: 'layoutComponentId',
    formType: 'selection',
    selectionOptions: layoutComponentList,
    columnDataRender: (rowData) => h('span', {}, {default: () => rowData.layoutComponent?.name})
  },
  {
    title: '角色权限',
    prop: 'roleId',
    formType: 'selection',
    selectionOptions: roleList,
    columnDataRender: (rowData, rowIndex) => h('span', {}, {
      default: () => {
        let find = roleList.value.find(r => r.value === rowData.roleId);
        return find ? find.label : '--';
      }
    })
  },
  {
    title: '菜单类型',
    prop: 'type',
    notTableColumn: true,
    formType: 'selection',
    selectionOptions: menuType
  },
  {
    title: '是否隐藏菜单',
    prop: 'hidden',
    columnDataRender: (rowData) => h(NTag, {
      type: rowData.hidden !== 1 ? 'success' : 'warning'
    }, {
      default: () => {
        return rowData.hidden !== 1 ? "显示" : "隐藏";
      }
    }),
    formType: 'selection',
    selectionOptions: [
      {
        label: '显示',
        value: 0
      }, {
        label: '隐藏',
        value: 1
      }
    ]
  },
  {
    title: '状态',
    prop: 'status',
    columnDataRender: (rowData, rowIndex) => h(NTag, {
      type: rowData.status === 1 ? 'success' : 'error'
    }, {
      default: () => rowData.status === 1 ? '启用' : '禁用'
    }),
    formType: 'selection',
    selectionOptions: selectStatusOptions
  },
  {
    title: '操作',
    prop: 'control',
    fixed: 'right',
    columnType: 'control'
  }
]);

// 开始菜单
const startMenuColumns = ref<NProTableColumn[]>([
  {
    title: '图标',
    prop: 'icon',
    formType: 'other',
    columnDataRender: (rowData, rowIndex) => renderIcon(rowData.icon),
    formItemRender: (value) => iconSelector(value)
  },
  {
    title: '名称',
    prop: 'name',
    formType: 'input',
    required: true
  },
  {
    title: '路由',
    prop: 'path',
    formType: 'input',
    required: true
  },
  {
    title: '组件名称',
    prop: 'componentName',
    formType: 'input',
    required: true
  },
  {
    title: '角色权限',
    prop: 'roleId',
    formType: 'selection',
    selectionOptions: roleList,
    columnDataRender: (rowData, rowIndex) => h('span', {}, {
      default: () => {
        let find = roleList.value.find(r => r.value === rowData.roleId);
        return find ? find.label : '--';
      }
    })
  },
  {
    title: '菜单类型',
    prop: 'type',
    notTableColumn: true,
    formType: 'selection',
    selectionOptions: menuType
  },
  {
    title: '状态',
    prop: 'status',
    columnDataRender: (rowData, rowIndex) => h(NTag, {
      type: rowData.status === 1 ? 'success' : 'error'
    }, {
      default: () => rowData.status === 1 ? '启用' : '禁用'
    }),
    formType: 'selection',
    selectionOptions: selectStatusOptions
  },
  {
    title: '操作',
    prop: 'control',
    fixed: 'right',
    columnType: 'control'
  }
])
// endregion 列


const handleChildMenuOpt = (menuList: any[]) => {
  let menus = [];
  menuList.forEach(m => {
    let menuOpt = {
      label: m.name,
      key: m.id,
      children: []
    }
    if (m.children) {
      menuOpt.children = handleChildMenuOpt(m.children);
    }
    menus.push(menuOpt);
  })
  return menus;
}


const handleSave = (param, cb) => {
  cb(saveMenu({...param}))
}

const handleUpdate = (param, cb) => {
  cb(updateMenu({...param}))
}

const handleRemove = (id, cb) => {
  cb(removeMenu(id))
}

</script>

<style scoped>

</style>
