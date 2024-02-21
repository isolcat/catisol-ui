<script setup lang="ts">
import { computed, defineProps, inject, type ComputedRef } from 'vue'

defineOptions({
  name: 'CCol'
})

const props = defineProps({
  span: {
    type: Number,
    default: 24
  }
})

//通过 provide 和 inject 来实现跨组件通信
const gutter = inject('gutter') as ComputedRef<number>

const style = computed(() => {
  return {
    width: `${(props.span / 24) * 100}%`,
    paddingLeft: gutter.value / 2 + 'px',
    paddingRight: gutter.value / 2 + 'px'
  }
})
</script>

<template>
  <div class="rCol" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped></style>
