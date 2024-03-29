# Button 按钮
常用操作按钮

## 按钮类型

<div style="margin-bottom:20px;">
    <CButton type="primary">Primary</CButton>
    <CButton type="success">Success</CButton>
    <CButton type="info">Info</CButton>
    <CButton type="warning">Warning</CButton>
    <CButton type="danger">Danger</CButton>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <CButton type="primary">Primary</CButton>
    <CButton type="success">Success</CButton>
    <CButton type="info">Info</CButton>
    <CButton type="warning">Warning</CButton>
    <CButton type="danger">Danger</CButton>
</template>
```

</details>

## 次要按钮

 <div style="margin-bottom:20px;">
    <CButton type="primary" plain>Primary</CButton>
    <CButton color="green" plain>Success</CButton>
    <CButton color="gray" plain>Info</CButton>
    <CButton color="yellow" plain>Waring</CButton>
    <CButton color="red" plain>Danger</CButton>
 </div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <CButton type="primary" plain>Primary</CButton>
    <CButton type="success" plain>Success</CButton>
    <CButton type="info" plain>Info</CButton>
    <CButton type="warning" plain>Warning</CButton>
    <CButton type="danger" plain>Danger</CButton>
</template>
```

</details>

## 按钮尺寸
 <div style="margin-bottom:20px;">
    <CButton size="small" plain>Small</CButton>
    <CButton size="medium" plain>Medium</CButton>
    <CButton size="large" plain>Large</CButton>
 </div>

 <details>
<summary>展开查看</summary>

```vue
<template>
    <CButton size="small" plain>Small</CButton>
    <CButton size="medium" plain>Medium</CButton>
    <CButton size="large" plain>Large</CButton>
</template>
```

</details>

## 图标按钮

 <div style="margin-bottom:20px;">
    <CButton color="blue" round plain icon="search">Search</CButton>
    <CButton color="green" round plain icon="edit">Edit</CButton>
    <CButton color="gray" round plain icon="check">Check</CButton>
    <CButton color="yellow" round plain icon="message">Message</CButton>
    <CButton color="red" round plain icon="delete">Delete</CButton>
 </div>
  <div style="margin-bottom:20px;">
    <CButton color="blue" round plain icon="search"></CButton>
    <CButton color="green" round plain icon="edit"></CButton>
    <CButton color="gray" round plain icon="check"></CButton>
    <CButton color="yellow" round plain icon="message"></CButton>
    <CButton color="red" round plain icon="delete"></CButton>
 </div>

 <details>
<summary>展开查看</summary>

```vue
<template>
    <CButton color="blue" round plain icon="search">Search</CButton>
    <CButton color="green" round plain icon="edit">Edit</CButton>
    <CButton color="gray" round plain icon="check">Check</CButton>
    <CButton color="yellow" round plain icon="message">Message</CButton>
    <CButton color="red" round plain icon="delete">Delete</CButton>

    <CButton color="blue" round plain icon="search"></CButton>
    <CButton color="green" round plain icon="edit"></CButton>
    <CButton color="gray" round plain icon="check"></CButton>
    <CButton color="yellow" round plain icon="message"></CButton>
    <CButton color="red" round plain icon="delete"></CButton>
</template>
```

</details>

## 纯色图标

 <div class="flex flex-row">
    <CButton icon="edit" plain></CButton>
    <CButton icon="delete" plain></CButton>
    <CButton icon="share" plain></CButton>
    <CButton round plain icon="search">搜索</CButton>
 </div>


<details>
<summary>展开查看</summary>

```vue
<template>
    <CButton icon="edit" plain></CButton>
    <CButton icon="delete" plain></CButton>
    <CButton icon="share" plain></CButton>
    <CButton round plain icon="search">Search</CButton>
</template>
```
</details>

## Button 属性

| 属性名 | 描述     | 默认值 |
| ------ | -------- | ------ |
| color  | 按钮颜色 | blue   |
| size   | 按钮大小 | Medium |
| plain  | 按钮主次 | -      |
| icon   | 按钮图标 | -      |
