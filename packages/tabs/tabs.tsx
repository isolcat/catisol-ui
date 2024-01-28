import { defineComponent, ref, watch, onMounted } from 'vue';
import './tab.css';

export default defineComponent({
  name: 'CTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'card',
    },
  },
  setup(props, { emit, slots }) {
    const currentIndex = ref(0);

    // 从子组件中获取索引
    const getIndexFromValue = (value) => {
      return slots.default?.().findIndex(tab => tab.props.name === value);
    };

    // 切换标签页
    const selectTab = (index) => {
      currentIndex.value = index;
      const name = slots.default?.()[index].props.name;
      emit('update:modelValue', name); // 更新外部modelValue
    };

    // 监听外部modelValue的变化
    watch(() => props.modelValue, (newValue) => {
      const index = getIndexFromValue(newValue);
      console.log(index);
      currentIndex.value = index !== -1 ? index : 0;
    });

    // 设置初始索引
    onMounted(() => {
      const index = getIndexFromValue(props.modelValue);
      currentIndex.value = index !== -1 ? index : 0;
    });

    return () => {
      // 安全检查以确保存在默认插槽
      if (!slots.default) {
        return <div class="ctabs-empty">No tabs provided</div>;
      }

      return (
        <div class={`ctabs ${props.type}`}>
          <div class="tabs-nav">
            {slots.default?.().map((tab, index) => (
              <div
                class={`tab-item ${currentIndex.value === index ? 'active' : ''}`}
                onClick={() => selectTab(index)}
              >
                {tab.props.title}
              </div>
            ))}
          </div>
          <div class="tabs-content">
            {slots.default?.()[currentIndex.value]}
          </div>
        </div>
      );
    };
  },
});
