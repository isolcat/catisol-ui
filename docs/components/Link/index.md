# 链接

## 基础用法

<div>
       <CLink href="#" class="primary" color="blue">Primary Link</CLink>
       <CLink href="#" type="success" color="green">Success Link</CLink>
       <CLink href="#" type="warning" color="yellow">Warning Link</CLink>
       <CLink href="#" type="danger" color="red">Danger Link</CLink>
       <CLink href="#" type="info" color="gray">Info Link</CLink>
</div>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.querySelector(".vp-doc")?.classList.remove('vp-doc')
});

</script>

<details>
<summary>展开查看</summary>

```vue
<template>
    <div>
       <CLink href="#" type="primary" color="blue">Primary Link</CLink>
       <CLink href="#" type="success" color="green">Success Link</CLink>
       <CLink href="#" type="warning" color="yellow">Warning Link</CLink>
       <CLink href="#" type="danger" color="red">Danger Link</CLink>
       <CLink href="#" type="info" color="gray">Info Link</CLink>
    </div>
</template>
```
</details>