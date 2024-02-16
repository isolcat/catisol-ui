<script setup>
import { ref } from 'vue';
import Message from '../../../packages/message/index';

const openInfo = () => Message({ message: '这是一条信息消息', type: 'info' });
const openSuccess = () => Message({ message: '操作成功', type: 'success' });
const openWarning = () => Message({ message: '这是一条警告消息', type: 'warn' });
const openError = () => Message({ message: '发生错误', type: 'error' });
const messageOpen2 = () => {
      Message({
        message: 'this is a warn message.',
        type: 'warn',
        timeout: 5000
      })
    }
</script>

# Message 消息提示

用于显示操作反馈信息

基本用法
展示一个信息提示，可定义消息类型为info、success、warning、error

<div style="margin-bottom:20px;">
    <CButton type="info" @click="openInfo">信息</CButton>
    <CButton type="success" @click="openSuccess">成功</CButton>
    <CButton type="warning" @click="openWarning">警告</CButton>
    <CButton  type="danger" @click="openError">错误</CButton>
</div>
<details>
<summary>展开查看</summary>

```vue
<template>
    <CButton type="info" @click="openInfo">信息</CButton>
    <CButton type="success" @click="openSuccess">成功</CButton>
    <CButton type="warning" @click="openWarning">警告</CButton>
    <CButton  type="danger" @click="openError">错误</CButton>
</template>

<script setup>
import { ref } from 'vue';
import Message from '路径/to/Message';

const openInfo = () => Message({ message: '这是一条信息消息', type: 'info' });
const openSuccess = () => Message({ message: '操作成功', type: 'success' });
const openWarning = () => Message({ message: '这是一条警告消息', type: 'warn' });
const openError = () => Message({ message: '发生错误', type: 'error' });
</script>

```
</details>

## 持续时间
可以自定义消息显示的持续时间，通过timeout属性配置（单位：毫秒

<div style="margin-bottom:20px;">
    <CButton type="warning" @click="messageOpen2">自定义时间</CButton>
</div>
<details>
<summary>展开查看</summary>

```vue
<template>
    <CButton type="warning" @click="messageOpen2">自定义时间</CButton>
</template>

<script setup>
import { ref } from 'vue';
import Message from '路径/to/Message';

const messageOpen2 = () => {
      Message({
        message: 'this is a warn message.',
        type: 'warn',
        timeout: 5000
      })
    }
</script>

```
</details>

## Message 函数参数
| 属性名  | 描述             | 类型   | 可选值                                     | 默认值   |
| ------- | ---------------- | ------ | ------------------------------------------ | -------- |
| message | 消息文字内容     | string | —                                          | —        |
| type    | 消息类型         | string | `'info'`, `'success'`, `'warn'`, `'error'` | `'info'` |
| icon    | 自定义图标类名   | string | —                                          | —        |
| timeout | 显示时长（毫秒） | number | —                                          | 3000     |
