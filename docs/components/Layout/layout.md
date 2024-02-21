<script setup>
    import demo1 from './demo1.vue'
    import demo2 from './demo2.vue'
</script>
# Layout布局

#### 通过基础的 24 分栏，迅速简便地创建布局

## 基本使用

使用列创建基础网格布局

通过 _row_ 和 _col_ 组件，并通过 _col_ 组件的 _span_ 属性我们就可以自由地组合布局

<br/>
    <demo1/>
<br/>

<details>
<summary>展开查看</summary>

```vue
<template>
  <c-row>
    <c-col :span="24">
      <div class="col-box col-box-1">24</div>
    </c-col>
  </c-row>
  <c-row>
    <c-col :span="12">
      <div class="col-box col-box-1">12</div>
    </c-col>
    <c-col :span="12">
      <div class="col-box col-box-2">12</div>
    </c-col>
  </c-row>
  <c-row>
    <c-col :span="8">
      <div class="col-box col-box-1">8</div>
    </c-col>
    <c-col :span="8">
      <div class="col-box col-box-2">8</div>
    </c-col>
    <c-col :span="8">
      <div class="col-box col-box-1">8</div>
    </c-col>
  </c-row>
  <c-row>
    <c-col :span="6">
      <div class="col-box col-box-1">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-1">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
  </c-row>
  <c-row>
    <c-col :span="12">
      <div class="col-box col-box-1">12</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
    <c-col :span="4">
      <div class="col-box col-box-1">4</div>
    </c-col>
    <c-col :span="2">
      <div class="col-box col-box-2">2</div>
    </c-col>
  </c-row>
</template>

<style lang="less" scoped>
.col-box {
  height: 34px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 34px;
  border-radius: 5px;
}
.col-box-1 {
  background-color: #9eaaaf;
  color: #333;
}
.col-box-2 {
  background-color: #505050;
  color: #fff;
}
</style>
```
</details>

## 分栏间距

支持列间距

行提供 _gutter_ 属性来指定列之间的间距，其默认值为0

<br/>
<demo2/>
<br/>

<details>
<summary>展开查看</summary>

```vue
<template>
  <c-row :gutter="20">
    <c-col :span="12">
      <div class="col-box col-box-1">12</div>
    </c-col>
    <c-col :span="12">
      <div class="col-box col-box-2">12</div>
    </c-col>
  </c-row>
  <c-row :gutter="20">
    <c-col :span="8">
      <div class="col-box col-box-1">8</div>
    </c-col>
    <c-col :span="8">
      <div class="col-box col-box-2">8</div>
    </c-col>
    <c-col :span="8">
      <div class="col-box col-box-1">8</div>
    </c-col>
  </c-row>
  <c-row :gutter="20">
    <c-col :span="6">
      <div class="col-box col-box-1">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-1">6</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
  </c-row>
  <c-row :gutter="20">
    <c-col :span="12">
      <div class="col-box col-box-1">12</div>
    </c-col>
    <c-col :span="6">
      <div class="col-box col-box-2">6</div>
    </c-col>
    <c-col :span="4">
      <div class="col-box col-box-1">4</div>
    </c-col>
    <c-col :span="2">
      <div class="col-box col-box-2">2</div>
    </c-col>
  </c-row>
</template>

<style lang="less" scoped>
.col-box {
  height: 34px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 34px;
  border-radius: 5px;
}
.col-box-1 {
  background-color: #9eaaaf;
  color: #333;
}
.col-box-2 {
  background-color: #505050;
  color: #fff;
}
</style>

```
</details>

## Row API
Row Attributes

| 属性名  | 说明                      | 类型   | 默认值 |
| ------- | ------------------------- | ------ | ------ |
| gutter  | 栅格间隔                  | Number | 0      |
| justify | flex 布局下的水平排列方式 | Enum   | start  |
| align   | flex 布局下的垂直排列方式 | Enum   | -      |
| tag     | 自定义元素标签            | String | div    |

## Col API
Col Attributes

| 属性名 | 说明               | 类型   | 默认值 |
| ------ | ------------------ | ------ | ------ |
| span   | 栅格占据的列数     | Number | 24     |
| offset | 栅格左侧的间隔格数 | Number | 0      |
| push   | 栅格向右移动格数   | Number | 0      |
| pull   | 栅格向左移动格数   | Number | 0      |

