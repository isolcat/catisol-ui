<template>
  <form class="simple-form" :class="{ 'form-inline': inline }" @submit.prevent="validateForm">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'CForm',
  props: {
    model: Object,
    inline: Boolean,
    rules: Object,
    labelPosition: {
      type: String,
      default: 'left',
    },
  },
  provide() {
    return {
      form: this, // 使 form 对象在依赖注入的子组件中可用
    };
  },
  data() {
    return {
      validators: [], // 存储每个 CFormItem 的校验函数
    };
  },
  methods: {
    // 注册校验函数
    registerValidation(validationFn) {
      this.validators.push(validationFn);
    },
    // 注销校验函数
    unregisterValidation(validationFn) {
      this.validators = this.validators.filter(v => v !== validationFn);
    },
    // 触发一次性校验所有表单项
    async validateForm() {
      let isValid = true;
      const validationResults = await Promise.all(this.validators.map(validate => validate()));

      // 检查所有校验结果，如果有任何一个校验失败，则整体校验失败
      isValid = validationResults.every(result => result);

      if (isValid) {
        this.$emit('validate-success', this.model); // 校验成功事件
      } else {
        this.$emit('validate-failure'); // 校验失败事件
      }
    }

  },
};
</script>

<style scoped>
.simple-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}

.form-inline .form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
  width: calc(50% - 20px);
}

.form-inline .form-item-label {
  margin-bottom: 0;
}

.form-item-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.form-item input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  transition: border-color 0.3s;
}

.form-item input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.form-item input::placeholder {
  color: #c0c4cc;
}

@media (max-width: 600px) {
  .form-inline .form-item {
    display: block;
    width: auto;
    margin-right: 0;
  }
}
</style>
