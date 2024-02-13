import { defineComponent, PropType, computed } from 'vue';
import './table.css'

interface TableProps {
  data: any[];
  stripe?: boolean;
  border?: boolean;
  height?: number;
  maxHeight?: number;
}

export default defineComponent({
  name: 'CTable',
  props: {
    data: {
      type: Array as PropType<TableProps['data']>,
      required: true,
    },
    stripe: Boolean,
    border: Boolean,
    height: Number,
    maxHeight: Number,
  },
  setup(props) {
    // 计算表头标题
    const tableTitle = computed(() => {
      const arr = props.data.map(item => Object.keys(item));
      let newArr: string[] = [];
      arr.forEach(item => {
        newArr = item.length >= newArr.length ? item : newArr;
      });
      return newArr;
    });

    // 表格样式
    const style = computed(() => ({
      borderStyle: 'none',
      height: props.height ? `${props.height}px` : undefined,
      maxHeight: props.maxHeight ? `${props.maxHeight}px` : undefined,
    }));

    return () => (
      <div class={`c-table ${props.border ? 'border' : ''}`} style={style.value}>
        <table>
          <thead>
            <tr>
              {tableTitle.value.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: props.stripe && index % 2 === 0 ? '#fafafa' : '#fff' }}>
                {tableTitle.value.map((key, i) => (
                  <td key={i}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
});
