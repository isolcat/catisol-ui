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
