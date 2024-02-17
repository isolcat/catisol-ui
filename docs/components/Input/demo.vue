<template>
  <CInput v-model="value5" placeholder="Please input">
    <template #btn>
      <CButton type="primary" leftIcon="m-icon-search">搜索</CButton>
    </template>
  </CInput>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value5 = ref('')
</script>
