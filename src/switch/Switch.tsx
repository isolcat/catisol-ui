import { defineComponent, PropType, ref } from "vue";
import "uno.css"
import "./switch.css"

export type ISize = "small" | "medium" | "large";

export const props = {
  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  }
} as const;

export default defineComponent({
  name: "CSwitch",
  props,
  setup(props, { slots }) {
    const checkedRef = ref(props.checked);
    const size = {
      small: {
       
      },
      medium: {
       
      },
      large: {
      
      },
    };
    return () => (
      <div>
            <input type="checkbox"
                class={`switch ${props.size}
                `}
                disabled={props.disabled}
                checked={checkedRef.value}
                onClick={() => { checkedRef.value = !checkedRef.value; }}
            />
      </div>
    );
  },
});
