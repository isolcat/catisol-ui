# 下拉框 Select

## 基本使用

<CSelect v-model="selection" :option="['小明', '小刚', '小红']" />
{{ selection }}

<script setup lang="ts">
  import { ref } from 'vue'
  const selection = ref('')
</script>

::: details 点击展开

```vue
<CSelect v-model="selection" :option="['小明', '小刚', '小红']" />
{{ selection }}

<script setup lang="ts">
import { ref } from 'vue'
const selection = ref('')
</script>
```

:::

## 可搜索

<CSelect filterOn v-model="selection" :option="['小明', '小刚', '小红']" />
 <C-card>
    <template #header>this is header</template>
    this is card content.
  </C-card>

::: details 点击展开

```vue
<CSelect filterOn v-model="selection" :option="['小明', '小刚', '小红']" />

<script setup lang="ts">
import { ref } from 'vue'
const selection = ref('')
</script>
```

:::