# CheckBox 复选框

通过鼠标或键盘输入字符

## 复选框尺寸

<script setup>
import { ref } from 'vue'
const show1 = ref(false)
const onOpenModal = () => {
  show1.value = !show1.value
}
</script>
<template>
  <ik-button @click="onOpenModal">打开 modal</ik-button>
  <CModal :visible="show1" @click-mask="onOpenModal"> modal contents ... </CModal>
</template>

<div style="display: flex">
    <Checkbox   size="small" text="Small"/><Checkbox   size="medium" shape="circle" text="Medium"/>
    <Checkbox   size="large" text="Large"/>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
<div>
    <Checkbox size="small" text="Small"/>
    <Checkbox size="medium"  text="Medium"/>
    <Checkbox size="large" text="Large"/>
</div>
</template>
```
</details>

## 禁用状态

<div style="display: flex">
    <Checkbox  disabled size="small" text="Small"/><Checkbox  disabled size="medium"  text="Medium"/>
    <Checkbox  disabled size="large" text="Large"/>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
<div>
    <Checkbox  disabled size="small" text="Small"/>
    <Checkbox  disabled  size="medium" text="Medium"/>
    <Checkbox  disabled size="large" text="Large"/>
</div>
</template>
```
</details>