<script setup lang="ts">
import demo from './base.vue'
import demo2 from './rule.vue'

</script>

# Form 表单

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据

## 基本用法

最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值

<demo />

<details>

<summary>展开查看</summary>

```vue
<template>
  <c-form :model="form" :rules="rules" @validate-success="onSubmit">
    <c-form-item label="Activity name" prop="name">
      <input v-model="form.name" type="text" />
    </c-form-item>
    <c-form-item label="Activity zone" prop="region">
      <CSelect v-model="selection" :option="['Zone One', 'Zone Two', 'Zone Three']" />
      {{ selection }}
    </c-form-item>
    <c-form-item label="Active type" prop="delivery">
      <Checkbox v-model="form.delivery" size="small" text="Online activities" />
      <Checkbox v-model="form.delivery" size="small" text="Promotion activities" />
    </c-form-item>
    <c-form-item label="Instant delivery" prop="delivery">
      <CSwitch v-model="disabledSwitchValue" />
    </c-form-item>
    <c-form-item label="Resources" prop="resource">
      <div>
        <label>
          <input type="radio" v-model="form.resource" value="Sponsor" /> Sponsor
        </label>
        <label>
          <input type="radio" v-model="form.resource" value="Venue" /> Venue
        </label>
      </div>
    </c-form-item>
    <c-form-item label="Activity form" prop="desc">
      <CTextarea v-model="form.desc" placeholder="Enter your text here" maxLength="100"></CTextarea>
    </c-form-item>
    <div>
      <CButton type="submit">Create</CButton>
      <CButton type="info">Cancel</CButton>
    </div>
  </c-form>
</template>

<script setup>
import { ref } from 'vue'
const disabledSwitchValue = ref(false);
const selection = ref('')
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: [],
  resource: '',
  desc: '',
})

const rules = {
  name: [
    { required: true, message: 'Please input the activity name' },
    { min: 3, message: 'The activity name must be at least 3 characters' },
  ],
  region: [
    { required: true, message: 'Please select the activity zone' },
  ],
  date1: [
    { required: true, message: 'Please select the start date' },
  ],
  date2: [
    { required: true, message: 'Please select the end time' },
  ],
  resource: [
    { required: true, message: 'Please choose a resource' },
  ],
  desc: [
    { required: true, message: 'Please input the activity form' },
    { min: 10, message: 'The description must be at least 10 characters' },
  ],
}

const onSubmit = () => {
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

input[type="checkbox"],
input[type="radio"] {
  margin-right: 5px;
}
</style>

</script>

```
</details>

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，当`required`为true的时候是必填的，并且会在Label前用红色的`*`进行标记，表示这个FormItem是必填项目

> 提供的验证规则:
> 
> **required: true** (必填)
>
> **min: 6** (至少要输入6个)
> 
> **max: 10** (最多输入10个)

<demo2/>


<details>

<summary>展开查看</summary>

```vue
<template>
  <c-form :model="form" :rules="rules" inline="false" @validate-success="onSubmit" @validate-failure="onFailure">
    <c-form-item label="Username" prop="username">
      <CInput v-model="form.username" type="text" placeholder="Enter your username"></CInput>
    </c-form-item>
    <c-form-item label="Email" prop="email">
      <CInput v-model="form.email" type="email" placeholder="Enter your email"></CInput>
    </c-form-item>
    <c-form-item label="Password" prop="password">
      <CInput show-password v-model="form.password" placeholder="Enter your password"></CInput>
    </c-form-item>
    <div>
      <CButton type="submit" @click="submitForm">Submit</CButton>
      <CButton type="info" @click="resetForm">Cancel</CButton>
    </div>
  </c-form>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  username: '',
  email: '',
  password: '',
});

const rules = {
  username: [
    { required: true, message: 'Please input the username' },
    { min: 3, max: 15, message: 'Username must be between 3 and 15 characters' },
  ],
  email: [
    { type: 'email', message: 'Please input a valid email address' },
  ],
  password: [
    { required: true, message: 'Please input the password' },
    { min: 6, message: 'Password must be at least 6 characters' },
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password' },
    {
      validator: (rule, value) => {
        if (value !== form.value.password) {
          return 'The two passwords do not match';
        }
        return true;
      },
      message: 'The two passwords do not match',
    }

  ],
};

const submitForm = () => {
  openSuccess
  // Implement form submission logic here
  console.log('Form submitted:', form.value);
};

const validateForm = () => {
  // Implement form validation logic here
  console.log('Validating form...');
};
const resetForm = () => {
  form.value = {
    username: '',
    email: '',
    password: '',
  };
};

</script>


```
</details>
