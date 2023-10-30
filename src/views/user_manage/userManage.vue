<template>
  <div class="app-container">
    <div class="query-container">
      <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form"
          :model="formState"
          @finish="onFinish"

      >
        <a-row :gutter="24" style="column-gap: 2rem;align-items: center">
          <template v-for="i in 6" :key="i">
            <a-col>
              <a-form-item
                  :name="`field-${i}`"
                  :label="`field-${i}`"
                  :rules="[{ required: true, message: 'input something' }]"
              >
                <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></a-input>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">Search</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">Clear</a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">Search Result List</div>
    </div>
    <a-table
        class="ant-table-striped"
        size="middle"
        :columns="columns"
        :data-source="data"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        :pagination="false"
    />
    <a-pagination
        v-model:current="pagination.current"
        v-model:pageSize="pagination.pageSize"
        show-size-changer
        :total="500"
        @showSizeChange="onShowSizeChange"
    />
  </div>
</template>


<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FormInstance} from 'ant-design-vue';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Ben Kang',
    age: 15,
    address: 'Sidney No. 1 Lake Park',
  },
];

const pagination = ref({
  total: 4,
  current: 1,
  pageSize: 2,
})

// const handleTableChange = (v)=>{
//   console.log(v)
// }
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
};

// const handleTableChange: TableProps['onChange'] = (
//     pag: { pageSize: number; current: number },
//     filters: any,
//     sorter: any,
// ) => {
//
// };

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({});
const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
};

</script>


<style scoped>
.query-container{
  margin: 2rem 1rem;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}

[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
