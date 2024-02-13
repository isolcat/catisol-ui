<script setup>
const tableData = [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
    ]
const tableData2 =  [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
      { id: 3, name: 'Item 3', price: '$300' },
      { id: 4, name: 'Item 4', price: '$400' },
      { id: 5, name: 'Item 5', price: '$500' },
      { id: 6, name: 'Item 6', price: '$600' },
    ]
    const tableData3 = [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
      { id: 3, name: 'Item 3', price: '$300' },
      { id: 4, name: 'Item 4', price: '$400' },
      { id: 5, name: 'Item 5', price: '$500' },
      { id: 6, name: 'Item 6', price: '$600' },
      { id: 7, name: 'Item 7', price: '$700' },
      { id: 8, name: 'Item 8', price: '$800' },
      { id: 9, name: 'Item 9', price: '$900' },
      { id: 10, name: 'Item 10', price: '$1000' },
    ]
</script>

# CTable 组件

用于创建和显示表格数据。支持斑马纹效果、边框、固定高度和滚动条等功能

## 基础用法

展示一个基础的表格，无斑马纹效果和边框
::: raw
  <CTable :data="tableData" />
:::

<details>
<summary>展开查看</summary>

```vue
<template>
  <CTable :data="tableData" />
</template>

<script setup>
const tableData = [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
    ]
</script>
```
</details>

## 斑马纹效果
启用斑马纹（条纹）效果的表格
::: raw
<CTable :data="tableData2" :stripe="true"></CTable>
:::
<details>
<summary>展开查看</summary>

``` vue
<template>
  <CTable :data="tableData" :stripe="true"></CTable>
</template>

<script setup>
const tableData2 =  [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
      { id: 3, name: 'Item 3', price: '$300' },
      { id: 4, name: 'Item 4', price: '$400' },
      { id: 5, name: 'Item 5', price: '$500' },
      { id: 6, name: 'Item 6', price: '$600' },
    ]
</script>

```
</details>

## 带边框的表格
显示带边框的表格。

::: raw
<CTable :data="tableData" border></CTable>
:::

<details>

<summary>展开查看</summary>

```vue
<template>
  <CTable :data="tableData" border></CTable>
</template>

<script setup>
const tableData = [
      { id: 1, name: 'Item 1', price: '$100' },
      { id: 2, name: 'Item 2', price: '$200' },
    ]
</script>
```

</details>

## 固定高度和滚动条

设置表格的高度和最大高度，展示滚动条效果
::: raw
<CTable :data="tableData3" :height="200" :maxHeight="500" border></CTable>
:::

<details>
<summary>展开查看</summary>

```vue
<template>
  <CTable :data="tableData" :height="200" :maxHeight="500"></CTable>
</template>

<script setup>
const tableData = ref([
  { id: 1, name: 'Item 1', price: '$100' },
  { id: 2, name: 'Item 2', price: '$200' },
  // 更多数据以展示滚动效果...
]);
</script>
```

</details>

## CTable 属性

| 属性名    | 描述               | 类型    | 默认值 |
| --------- | ------------------ | ------- | ------ |
| data      | 表格数据数组       | Array   | []     |
| stripe    | 是否启用斑马纹效果 | Boolean | false  |
| border    | 是否显示边框       | Boolean | false  |
| height    | 表格高度           | Number  | -      |
| maxHeight | 表格最大高度       | Number  | -      |
