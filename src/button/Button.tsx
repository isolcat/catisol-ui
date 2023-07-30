import { defineComponent, PropType, ref } from 'vue';
import 'uno.css';

export type ISize = 'small' | 'medium' | 'large';
export type IColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
export type IButtonType = 'default' | 'warning' | 'danger' | 'success' | 'info'; // 新增按钮类型

export const props = {
  // 新增 type 属性
  type: {
    type: String as PropType<IButtonType>,
    default: 'default'
  },
  // 其他属性保持不变
  size: {
    type: String as PropType<ISize>,
    default: 'medium'
  },

  color: {
    type: String as PropType<IColor>,
    default: 'blue'
  },

  round: {
    type: Boolean,
    default: false
  },

  plain: {
    type: Boolean,
    default: false
  },

  icon: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  }
};
export default defineComponent({
  name: 'CButton',
  props,
  setup(props, { slots }) {
    const size = {
      small: {
        x: '2',
        y: '1',
        text: 'sm'
      },
      medium: {
        x: '3',
        y: '1.5',
        text: 'base'
      },
      large: {
        x: '4',
        y: '2',
        text: 'lg'
      }
    };

    const getColorClass = () => {
      switch (props.type) {
        case 'danger':
          return 'bg-red-500 hover:bg-red-400 border-red-500';
        case 'success':
          return 'bg-green-500 hover:bg-green-400 border-green-500';
        case 'info':
          return 'bg-gray-300 hover:bg-gray-200 border-gray-300';
        case 'warning':
          return 'bg-yellow-500 hover:bg-yellow-400 border-yellow-500';
        default:
          return `bg-${props.color}-${props.plain ? '100' : '500'} hover:bg-${props.color}-400 border-${props.color}-${props.plain ? '500' : '500'}`;
      }
    };

    return () => (
      <button
        disabled={props.disabled}
        onClick={() => {
          if (!props.disabled) {
            // your code
          }
        }}
        class={`
          py-${size[props.size].y}
          px-${size[props.size].x}
          ${props.round ? 'rounded-full' : 'rounded-lg'}
          ${getColorClass()}
          cursor-pointer
          border-solid
          text-${props.plain ? props.color + '-500' : 'white'}
          text-${size[props.size].text}
          hover:text-white
          transition duration-300 ease-in-out transform hover:scale-105
          mx-1
          ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {props.icon !== '' ? <i class={`i-ic-baseline-${props.icon} p-3`} /> : ''}
        {slots.default ? slots.default() : ''}
      </button>
    );
  }
});
