# 开关

## 基本用法
<div style="margin-bottom:20px;">
    <CSwitch v-model="switchValue"></CSwitch>
</div>

<script setup>
import { ref } from 'vue'
const switchValue = ref(false)
const disabledSwitchValue = ref(false);
const colorSwitchValue = ref(false);
const textSwitchValue = ref(false);
const textAlignSwitchValue = ref(false);
</script>

  <details>
<summary>展开查看</summary>

```vue
<template>
    <CSwitch v-model="switchValue" />
</template>

<script setup>
import { ref } from 'vue';
const switchValue = ref(false);
</script>

```

</details>

## 禁用状态

通过disabled属性来禁用开关，禁用状态下开关不可点击

<div style="display:flex">
  <CSwitch v-model="disabledSwitchValue" :disabled="true"></CSwitch>
</div>

  <details>
<summary>展开查看</summary>

```vue
<template>
    <CSwitch v-model="disabledSwitchValue" :disabled="true" />
</template>

<script setup>
import { ref } from 'vue';
const disabledSwitchValue = ref(false);
</script>

```

</details>

## 自定义颜色
通过`onColor`和`closeColor`属性来自定义开关的颜色。

<div style="display:flex">
  <CSwitch v-model="colorSwitchValue" onColor="#13ce66" closeColor="#ff4949"></CSwitch>
</div>

<details>

<summary>展开查看</summary>

```vue

<template>
    <CSwitch v-model="colorSwitchValue" onColor="#13ce66" closeColor="#ff4949" />
</template>

<script setup>
import { ref } from 'vue';
const colorSwitchValue = ref(false);
</script>

```

</details>

## 文本显示

设置`showText`属性为true来显示开关的文本，通过`onText`和`closeText`来自定义文本内容

<div style="margin-bottom:20px;">
    <CSwitch v-model="textSwitchValue" :showText="true" onText="开启" closeText="关闭"></CSwitch>
</div>
<details>

<summary>展开查看代码</summary>

```vue
<template>
    <CSwitch v-model="textSwitchValue" :showText="true" onText="开启" closeText="关闭" />
</template>

<script setup>
import { ref } from 'vue';
const textSwitchValue = ref(false);
</script>

```

</details>

## 文本对齐
通过`textAlign`属性来设置文本的对齐方式，可选值为left或right

<div style="margin-bottom:20px;">
    <CSwitch v-model="textAlignSwitchValue" :showText="true" textAlign="left"></CSwitch>
</div>

<details>

<summary>展开查看代码</summary>

```vue
<template>
    <CSwitch v-model="textAlignSwitchValue" :showText="true" textAlign="left" />
</template>

<script setup>
import { ref } from 'vue';
const textAlignSwitchValue = ref(false);
</script>

```

</details>

## CSwitch 属性

| 属性名     | 描述                   | 类型    | 默认值  |
| ---------- | ---------------------- | ------- | ------- |
| modelValue | 绑定的值，控制开关状态 | Boolean | false   |
| disabled   | 是否禁用开关           | Boolean | false   |
| width      | 开关的宽度             | Number  | 40      |
| onColor    | 开启状态的颜色         | String  | #409eff |
| closeColor | 关闭状态的颜色         | String  | #ccc    |
| showText   | 是否显示文本           | Boolean | false   |
| onText     | 开启状态的文本         | String  | 开启    |
| closeText  | 关闭状态的文本         | String  | 关闭    |
| textAlign  | 文本对齐方式           | String  | right   |


## CSwitch 事件

| 事件名            | 描述               | 回调参数 |
| ----------------- | ------------------ | -------- |
| update:modelValue | 绑定值更新时触发   | 新的值   |
| change            | 开关状态改变时触发 | 新的状态 |

