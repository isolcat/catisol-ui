<script setup lang="ts">
import { defineProps, ref, onMounted, withDefaults } from 'vue'
import 'uno.css';

export interface MessageProps {
  message?: string
  type: 'info' | 'success' | 'error' | 'warn'
  icon?: string // 已经正确定义，用于接收图标
}

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info'
})

const showValue = ref(false)
onMounted(() => {
  showValue.value = true
})
</script>

<template>
  <Transition name="slide-fade">
    <div class="message" v-show="showValue" :class="[
      type === 'info' ? 'color-info' : '',
      type === 'error' ? 'color-error' : '',
      type === 'success' ? 'color-success' : '',
      type === 'warn' ? 'color-warn' : ''
    ]">
      <!-- 如果提供了icon属性，就渲染对应的图标 -->
      <i :class="`i-ic-baseline-${props.icon}`" v-if="props.icon"></i>
      <span class="message-slot">{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

div.slide-fade-enter-from,
div.slide-fade-leave-to {
  transform: translate(-50%, -65px);
  opacity: 0;
}

.message {
  display: flex;
  position: fixed;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
  padding: 5px 20px;
  min-height: 45px;
  border-radius: 5px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.message.color-info {
  background-color: #f4f4f5;
  color: #909399;
}

.message.color-error {
  background-color: #fef0f0;
  color: #f56f6f;
}

.message.color-success {
  background-color: #f0f9eb;
  color: #68c23b;
}

.message.color-warn {
  background-color: #fdf6ec;
  color: #e6a33e;
}

.message i {
  margin-right: 8px;
  vertical-align: middle;
  font-size: 16px;
}
</style>
