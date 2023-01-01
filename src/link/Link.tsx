import { defineComponent, PropType, ref } from "vue";
import "uno.css";

export type IType = 'default' | 'primary' | 'success' | 'warning' | 'danger'| 'info'
export type IColor = 'black' | 'blue' | 'green' | 'yellow'| 'red' | 'gray'
export const props = {
  type: {
    type: String as PropType<IType>,
    default: "default",
  },
  color: {
    type: String as PropType<IColor>,
    default: "black",
  },
  plain: {
    type: Boolean,
    default: true,
  },
  href: {
    type: String,
    required: true,
  },
} as const;

export default defineComponent({
  name: "CLink",
  props,
  setup(props, { slots }) {
        return () => (
      <a
      class={`
        text-${props.plain ? props.color + "-500" : "white"}
        hover:text-${props.color}-400
        cursor-pointer
        text-lg
        hover:text-white
        transition duration-300 ease-in-out transform hover:scale-105
        mx-1
        decoration-none
        `}
      href={props.href}      
    >
      {slots.default ? slots.default() : 'Link'}
    </a>
    );    
  },
});
