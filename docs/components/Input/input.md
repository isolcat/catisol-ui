<script setup lang="ts">
import { ref } from 'vue'
import demo from './demo.vue'

const value1 = ref('')
const value2 = ref('尝试点击旁边的按钮清空吧')
const value3 = ref('123')
const value4 = ref('')
const test = ref('')

</script>

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

 <div>
    <CInput v-model="value1" placeholder="Please input"></CInput>
 </div>

<details>
<summary>展开查看</summary>

```vue
<template>
 <div>
    <CInput v-model="value" placeholder="Please input" clearable></CInput>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```
</details>

## 可清空的输入框

提供一个清空按钮，允许用户清空输入内容，通过`clearable`来控制是否展示清空按钮
<CInput v-model="value2" placeholder="Please input" clearable></CInput>

<details>
<summary>展开查看</summary>

```vue
<template>
 <div>
    <CInput v-model="value" placeholder="Please input" clearable></CInput>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```
</details>

## 密码输入框
一个可以切换显示隐藏密码的输入框

<div style="margin-bottom:20px;">
    <CInput v-model="value3" placeholder="Please input" show-password />
</div>

<details>

<summary>展开查看</summary>

```vue
<template>
 <div>
    <CInput v-model="value" placeholder="Please input" show-password />
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```
</details>

## 尺寸
使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`

<CInput v-model="test" placeholder="Please input" size="large"></CInput>
<br/>
<CInput v-model="test" placeholder="Please input"></CInput>
<br/>
<CInput v-model="test" placeholder="Please input" size="small"></CInput>

<details>

<summary>展开查看</summary>

```vue
<template>
 <div>
    <CInput v-model="test" placeholder="Please input" size="large"></CInput>
    <CInput v-model="test" placeholder="Please input"></CInput>
    <CInput v-model="test" placeholder="Please input" size="small"></CInput>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```
</details>

## 带图标的输入框

在输入框内添加左侧或右侧图标
> 注意：当你设置了**右侧图标**后，就无法再设置清空按钮的出现了

<CInput v-model="value4" placeholder="Please input" leftIcon="search"></CInput>

<details>

<summary>展开查看</summary>

```vue
<template>
 <div>
    <CInput v-model="value" placeholder="Please input" leftIcon="search"></CInput>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```
</details>

## 带按钮的输入框

可以通过插槽在CInput组件内部嵌入按钮，以实现更丰富的交互功能，例如搜索
<demo/>

<details>

<summary>展开查看</summary>

```vue
<template>
  <CInput v-model="value1" placeholder="Please input">
    <template #btn>
      <CButton type="primary" leftIcon="m-icon-search">搜索</CButton>
    </template>
  </CInput>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
</script>
```
</details>

## 禁用状态

 <div>
    <CInput disabled />
 </div>

 <details>
<summary>展开查看</summary>

```vue
<template>
<div>
   <CInput disabled />
</div>
</template>
```
</details>


| 属性名        | 描述                 | 类型    | 默认值  |
| ------------- | -------------------- | ------- | ------- |
| placeholder   | 输入框占位文本       | String  | -       |
| clearable     | 是否可清空           | Boolean | false   |
| show-password | 是否显示密码切换按钮 | Boolean | false   |
| size          | 调整输入框大小       | String  | default |
| leftIcon      | 左侧图标类名         | String  | -       |
| rightIcon     | 右侧图标类名         | String  | -       |
| disabled      | 是否禁用             | Boolean | false   |
