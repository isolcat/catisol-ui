# 文本域

## 基本使用
  <CTextarea placeholder="Enter your text here" />

  <details>
<summary>展开查看</summary>

```vue
<template>
      <CTextarea placeholder="Enter your text here" /> 
</template>
```
</details>

## 自定义最大字数
设置`maxLength`属性来设置文本域最多输入的字数
  <CTextarea placeholder="max-lenght is 10"  maxLength="10" />
  <details>
<summary>展开查看</summary>

```vue
<template>
     <CTextarea maxLength="10" />
</template>
```
</details>

## 禁止状态
  <CTextarea disabled />
  <details>
<summary>展开查看</summary>

```vue
<template>
     <CTextarea disabled />
</template>
```
</details>