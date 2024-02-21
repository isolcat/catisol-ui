<template>
  <div class="form-item" :class="{ 'form-item-inline': form.inline, [form.labelPosition]: true }">
    <c-row>
      <c-col :span="6">
        <label v-if="label" :class="['form-item-label', { top: form.labelPosition === 'top' }]" :for="label">
          <!-- 星号总是渲染，但颜色根据isRequired动态变化 -->
          <span class="required-star" :style="{ color: isRequired ? 'red' : 'transparent' }">*</span>
          {{ label }}
        </label>
      </c-col>
      <c-col :span="18" class="input-container">
        <slot></slot>
        <transition name="fade">
          <p v-if="errorMessage" class="form-item-error">{{ errorMessage }}</p>
        </transition>
      </c-col>
    </c-row>
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted, ref, watch, computed } from 'vue';

export default {
  name: 'CFormItem',
  props: {
    label: String,
    prop: String,
  },
  setup(props) {
    const form = inject('form', { model: {}, rules: {}, labelPosition: 'left' });
    const errorMessage = ref('');

    const isRequired = computed(() => {
      const rules = form.rules[props.prop];
      return rules ? rules.some(rule => rule.required) : false;
    });

    const validate = async () => {
      let value = form.model[props.prop];
      let rules = form.rules[props.prop];
      if (!rules) return true;

      for (const rule of rules) {
        // 处理自定义validator规则
        if (rule.validator) {
          let error = await rule.validator(value, rule);
          if (error !== true) {
            errorMessage.value = typeof error === 'string' ? error : rule.message;
            return false;
          }
        } else {
          // 处理min规则
          if (rule.min !== undefined && (value.length < rule.min)) {
            errorMessage.value = rule.message || `The field must be at least ${rule.min} characters`;
            return false;
          }
          // 处理max规则
          if (rule.max !== undefined && (value.length > rule.max)) {
            errorMessage.value = rule.message || `The field must be no more than ${rule.max} characters`;
            return false;
          }
          // 处理required规则
          if (rule.required && (value === '' || value === undefined || value === null)) {
            errorMessage.value = rule.message || 'This field is required';
            return false;
          }
        }
      }
      errorMessage.value = '';
      return true;
    };


    onMounted(() => {
      if (form.registerValidation) form.registerValidation(validate);
    });
    onUnmounted(() => {
      if (form.unregisterValidation) form.unregisterValidation(validate);
    });

    watch(() => form.model[props.prop], validate);

    return {
      errorMessage,
      form,
      isRequired,
    };
  },
};
</script>


<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-item-label {
  margin-bottom: 8px;
  color: #aaa;
  /* 浅灰色字体 */
}

.required-star {
  color: red;
  margin-right: 4px;
}

.form-item-label.left {
  order: -1;
  flex-direction: row;
  margin-bottom: 0;
  margin-right: 10px;
}

.form-item.left {
  flex-direction: row;
  align-items: center;
}

.input-container {
  position: relative;
}

.form-item-error {
  position: absolute;
  left: 0;
  bottom: -2.7rem;
  color: #ff6060;
  opacity: 1;
  font-size: 0.9em;
  transition: opacity 0.7s ease;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
