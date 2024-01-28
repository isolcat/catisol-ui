# CBadge 徽章
用于显示状态标记的徽章组件。

## 徽章类型

<div style="margin-bottom:20px;">
    <CBadge type="default">
      <CButton>Default</CButton>
    </CBadge>
    <CBadge type="success">
      <CButton type="success">Success</CButton>
    </CBadge>
    <CBadge type="prompts">
      <CButton type="warning">Prompts</CButton>
    </CBadge>
    <CBadge type="warnings">
      <CButton type="danger">Warnings</CButton>
    </CBadge>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
   <CBadge type="default">
      <CButton>Default</CButton>
    </CBadge>
    <CBadge type="success">
      <CButton type="success">Success</CButton>
    </CBadge>
    <CBadge type="prompts">
      <CButton type="warning">Prompts</CButton>
    </CBadge>
    <CBadge type="warnings">
      <CButton type="danger">Warnings</CButton>
    </CBadge>
</template>
```

</details>

## 徽章尺寸

<div style="margin-bottom:20px;">
    <CBadge size="small">
      <CButton>Small</CButton>
    </CBadge>
    <CBadge size="medium">
      <CButton>Medium</CButton>
    </CBadge>
    <CBadge size="large">
      <CButton>large</CButton>
    </CBadge>
</div>
<details>

<summary>展开查看</summary>

```vue
<template>
    <CBadge size="small">
      <CButton>Small</CButton>
    </CBadge>
    <CBadge size="medium">
      <CButton>Medium</CButton>
    </CBadge>
    <CBadge size="large">
      <CButton>large</CButton>
    </CBadge>
</template>
```

</details>

## 徽章内容

<div style="margin-bottom:20px;">
    <CBadge type="success" content="100" size="small" round>
      <CButton type="success">Success</CButton>
    </CBadge>
</div>


<details>
<summary>展开查看</summary>

```vue
<template>
   <CBadge type="default">
      <CButton>Default</CButton>
    </CBadge>
    <CBadge type="success">
      <CButton>Success</CButton>
    </CBadge>
    <CBadge type="prompts">
      <CButton>Prompts</CButton>
    </CBadge>
    <CBadge type="warnings">
      <CButton>Warnings</CButton>
    </CBadge>
</template>
```

</details>

## 圆角徽章
<div style="margin-bottom:20px;">
    <CBadge round type="default" content="10">
      <CButton>Round</CButton>
    </CBadge>
</div>
<details>
<summary>展开查看</summary>
``` vue
<template>
    <CBadge round type="default">Default</CBadge>
    <CBadge round type="success">Success</CBadge>
    <CBadge round type="prompts">Prompts</CBadge>
    <CBadge round type="warnings">Warnings</CBadge>
</template>
```
</details>

| 属性名  | 描述     | 默认值  |
| ------- | -------- | ------- |
| type    | 徽章类型 | default |
| size    | 徽章大小 | medium  |
| round   | 是否圆角 | false   |
| content | 徽章内容 | -       |

