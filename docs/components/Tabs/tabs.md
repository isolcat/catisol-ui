<script setup>
import { ref } from 'vue';

const activeTab = ref('tab1');
</script>

# CTabs 标签页
用于创建可切换内容的标签页。

## 标签页类型

<div style="margin-bottom:20px;">
    <CTabs type="card">
        <div name="tab1" title="Tab 1">Card Tab 1</div>
        <div name="tab2" title="Tab 2">Card Tab 2</div>
        <div name="tab3" title="Tab 3">Card Tab 3</div>
    </CTabs>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <CTabs type="card">
        <div name="tab1" title="Tab 1">Card Tab 1</div>
        <div name="tab2" title="Tab 2">Card Tab 2</div>
        <div name="tab3" title="Tab 3">Card Tab 3</div>
    </CTabs>
</template>
```
</details>

## CTabs 属性

| 属性名     | 描述           | 默认值 |
| ---------- | -------------- | ------ |
| modelValue | 当前激活的标签 | ''     |
| type       | 标签页类型     | 'card' |
