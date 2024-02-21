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
