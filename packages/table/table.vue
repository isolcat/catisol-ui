<script lang="ts" setup>
import { computed, defineProps } from 'vue'

defineOptions({
  name: 'CTable'
})

interface tableProps {
  data: any[]
  stripe?: boolean
  border?: boolean
  height?: number
  maxHeight?: number
}

const props = defineProps<tableProps>()
// 表头标题
const tableTitle = computed(() => {
  const arr = props.data.map((item) => Object.keys(item))
  let newArr: string[] = []
  arr.forEach((item) => {
    newArr = item.length >= newArr.length ? item : []
  })

  return newArr
})

const style = computed(() => {
  return {
    height: props.height + 'px',
    maxHeight: props.maxHeight + 'px'
  }
})
</script>

<template>
  <div class="c-table" :class="{ border: border }" :style="style">
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in tableTitle" :key="index">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index"
          :style="[{ backgroundColor: stripe && index % 2 === 0 ? '#fafafa' : '#fff' }]">
          <td v-for="(key, index) in tableTitle" :key="index">{{ item[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.c-table {
  width: 100%;
  overflow: auto;
  border-style: none;
}

.c-table table {
  width: 100%;
  border-radius: 2px;
  box-sizing: border-box;
  border-spacing: 0;
  background-color: #fff;
}

.c-table table thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
}

.c-table table tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.c-table table tr:hover {
  background-color: #f5f7fa !important;
}

.c-table table tr th,
.c-table table tr td {
  padding: 8px 12px;
  box-sizing: border-box;
  text-align: left;
  line-height: 20px;
  color: #646468;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  border-right: 0;
}

.c-table::-webkit-scrollbar {
  visibility: hidden;
  width: 5px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.c-table:hover::-webkit-scrollbar {
  height: 5px;
}

.c-table:hover::-webkit-scrollbar-thumb {
  background-color: #dddee0;
  -webkit-border-radius: 5px;
}

.c-table:hover::-webkit-scrollbar-track {
  background-color: #fff;
}

.border thead td,
.border thead th {
  border-top: 1px solid #f0f0f0;
}

.border td,
.border th {
  border: 1px solid #f0f0f0;
  border-top: 0;
}

.border td:last-child,
.border th:last-child {
  border-right: 1px solid #f0f0f0;
}
</style>
