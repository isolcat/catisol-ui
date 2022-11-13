# Button 按钮
常用操作按钮

## 基础用法

基础的函数用法



```vue
<template>
 <div style="margin-bottom:20px;">
    <CButton color="blue">主要按钮</CButton>
    <CButton color="green">绿色按钮</CButton>
    <CButton color="gray">灰色按钮</CButton>
    <CButton color="yellow">黄色按钮</CButton>
    <CButton color="red">红色按钮</CButton>
 </div>

 <div style="margin-bottom:20px;">
    <CButton color="blue" plain>朴素按钮</CButton>
    <CButton color="green" plain>绿色按钮</CButton>
    <CButton color="gra   y" plain>灰色按钮</CButton>
    <CButton color="yellow" plain>黄色按钮</CButton>
    <CButton color="red" plain>红色按钮</CButton>
 </div>

 <div style="margin-bottom:20px;">
    <CButton size="small" plain>小按钮</CButton>
    <CButton size="medium" plain>中按钮</CButton>
    <CButton size="large" plain>大按钮</CButton>
 </div>

 <div style="margin-bottom:20px;">
    <CButton color="blue" round plain icon="search">搜索按钮</CButton>
    <CButton color="green" round plain icon="edit">编辑按钮</CButton>
    <CButton color="gray" round plain icon="check">成功按钮</CButton>
    <CButton color="yellow" round plain icon="message">提示按钮</CButton>
    <CButton color="red" round plain icon="delete">删除按钮</CButton>
 </div>

 <div style="margin-bottom:20px;">
    <CButton color="blue" round plain icon="search"></CButton>
    <CButton color="green" round plain icon="edit"></CButton>
    <CButton color="gray" round plain icon="check"></CButton>
    <CButton color="yellow" round plain icon="message"></CButton>
    <CButton color="red" round plain icon="delete"></CButton>
 </div>
</template>
```

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。


```vue
<template>
 <div class="flex flex-row">
    <CButton icon="edit" plain></CButton>
    <CButton icon="delete" plain></CButton>
    <CButton icon="share" plain></CButton>
    <CButton round plain icon="search">搜索</CButton>
 </div>
</template>
```
