<template>
  <c-form :model="formData" :rules="rules" ref="form" @validate-success="handleSuccess" @validate-failure="handleFailure">
    <c-form-item label="Username" prop="username">
      <CInput v-model="formData.username" type="text" />
    </c-form-item>
    <c-form-item label="Password" prop="password">
      <CInput v-model="formData.password" show-password />
    </c-form-item>
    <c-form-item label="Confirm Password" prop="confirmPassword">
      <CInput v-model="formData.confirmPassword" show-password />
    </c-form-item>
    <CButton type="submit">Submit</CButton>
  </c-form>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        username: [
          { required: true, message: 'Please enter your username' },
          { min: 3, message: 'Username must be at least 3 characters' },
        ],
        password: [
          { required: true, message: 'Please enter your password' },
          { min: 6, message: 'Password must be at least 6 characters' },
        ],
        confirmPassword: [
          { required: true, message: 'Please confirm your password' },
          {
            validator: (value, rule) => {
              return value === this.formData.password || 'Passwords do not match';
            },
          },
        ],
      },
    };
  },
  methods: {
    handleSuccess(model) {
      console.log('Form submitted:', model);
      // 提交表单数据
    },
    handleFailure() {
      console.error('Form validation failed');
    },
  },
};
</script>
