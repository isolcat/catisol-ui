<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect, computed } from 'vue'

defineOptions({
  name: 'CSwitch'
})

interface switchProps {
  modelValue?: boolean
  disabled?: boolean
  width?: number
  onColor?: string
  closeColor?: string
  showText?: boolean
  closeText?: string
  onText?: string
  textAlign?: 'right' | 'left'
}

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; change: [value: boolean] }>()
const props = withDefaults(defineProps<switchProps>(), {
  modelValue: false,
  disabled: false,
  width: 40,
  onColor: '#409eff',
  closeColor: '#ccc',
  closeText: '关闭',
  onText: '开启',
  textAlign: 'right'
})

const contentStyle = computed(() => {
  return {
    backgroundColor: props.closeColor,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    width: props.width + 'px'
  }
})

const alignStyle = ref({ fontSize: '14px', color: '#ccc', margin: '0 5px' })
const roundStyle = ref({
  left: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
const textStyle = ref({ right: '4px' })
const flag = ref(props.modelValue) //true为打开，false为关闭（默认为false）

const isChecked = () => {
  //先判断是否处于禁用状态
  if (!props.disabled) {
    flag.value = !flag.value
    emit('update:modelValue', flag.value)
    emit('change', flag.value)
  }
}

// 监听modelValue
watchEffect(() => {
  roundStyle.value.left = props.modelValue ? props.width - 18 + 'px' : '2px'
  contentStyle.value.backgroundColor = props.modelValue ? props.onColor : props.closeColor
  textStyle.value.right = props.modelValue ? '24px' : '4px'
  alignStyle.value.color = props.modelValue ? '#409eff' : '#ccc'
})
</script>

<template>
  <div class="r-switch">
    <span v-if="textAlign === 'left'" :style="alignStyle">
      {{ modelValue ? onText : closeText }}</span>
    <div class="r-switch_content" :style="contentStyle" @click="isChecked">
      <div class="r-switch_round" :style="roundStyle">
        <slot> </slot>
      </div>
      <span v-show="showText" class="text" :style="textStyle">{{ modelValue ? '关' : '开' }}</span>
    </div>
    <span v-if="textAlign === 'right'" :style="alignStyle">{{
      modelValue ? onText : closeText
    }}</span>
  </div>
</template>


<style>
.r-switch {
  display: inline-flex;
  position: relative;
  height: 32px;
  padding: 0 10px;
  line-height: 20px;
  vertical-align: middle;
  align-items: center;
}

.r-switch .r-switch_content {
  display: flex;
  position: relative;
  min-width: 40px;
  height: 20px;
  border-radius: 15px;
  align-items: center;
}

.r-switch .r-switch_content .r-switch_round {
  display: flex;
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.r-switch .r-switch_content .text {
  position: absolute;
  color: #fff;
  font-size: 12px;
  transition: all 0.3s ease-in-out;
}
</style>
