<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import 'uno.css';

export interface inputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  leftIcon?: string
  rightIcon?: string
  size?: 'default' | 'large' | 'small' // 新增size属性
}


defineOptions({
  name: 'CInput'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [e: any]
  blur: [e: any]
  input: [e: any]
  change: [e: any]
}>()

const props = defineProps<inputProps>()

let isActive = ref(false)
const input = (e: any) => {
  emit('update:modelValue', e.target.value)
  emit('input', e.target.value)
}

const change = (e: any) => {
  emit('change', e)
}

const focus = (e: any) => {
  isActive.value = true
  emit('focus', e)
}

const blur = (e: any) => {
  isActive.value = false
  emit('blur', e)
}

const clear = () => {
  emit('update:modelValue', '')
}
</script>
<template>
  <div class="r-input" :class="`r-input-${props.size || 'default'}`">
    <div :class="[
      'r-input-wrapper',
      `r-input-wrapper-${props.size || 'default'}`,
      { active: !props.disabled && isActive, disabled: props.disabled }
    ]">
      <i :class="`i-ic-baseline-${props.leftIcon}`" v-if="props.leftIcon" style="margin-right: 5px"></i>
      <input :type="props.showPassword ? 'password' : 'text'" :value="props.modelValue" :disabled="props.disabled"
        :placeholder="props.placeholder" :class="{ disabled: props.disabled }" @focus="focus" @blur="blur" @input="input"
        @change="change" />
      <CButton icon="delete" plain v-if="props.clearable && props.modelValue && props.rightIcon === undefined" @click="clear"
        color="gray" round></CButton>
      <i :class="`i-ic-baseline-${props.rightIcon}`" v-if="props.rightIcon"></i>
    </div>
    <slot name="btn"></slot>
  </div>
</template>



<style>
.r-input {
  display: flex;
  width: 100%;
  height: 35px;
  box-sizing: border-box;
}

.r-input .r-input-wrapper {
  display: flex;
  flex: 1;
  padding: 1px 11px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 6px;
  cursor: text;
}

.r-input .r-input-wrapper.active {
  box-shadow: 0 0 0 1px #268ced;
}

.r-input .r-input-wrapper.disabled {
  background-color: #f5f7fa;
}

.r-input .r-input-wrapper input {
  width: 100%;
  height: 100%;
  color: #606266;
  font-size: inherit;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.r-input .r-input-wrapper input.disabled {
  cursor: not-allowed;
  background-color: #f5f7fa;
}
.r-input-large .r-input-wrapper,
.r-input-large .r-input-wrapper input {
  height: 45px; /* 大尺寸高度 */
  font-size: 18px; /* 大尺寸字体 */
}

.r-input-small .r-input-wrapper,
.r-input-small .r-input-wrapper input {
  height: 25px; /* 小尺寸高度 */
  font-size: 12px; /* 小尺寸字体 */
}

.r-input .r-input-wrapper i {
  color: #ccc;
  font-size: 18px;
  cursor: pointer;
}
</style>
