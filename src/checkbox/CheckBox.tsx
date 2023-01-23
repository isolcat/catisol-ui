import { defineComponent, PropType, ref } from "vue";
import "uno.css"

export type ISize = "small" | "medium" | "large";

export const props = {
  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },
  text: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selectableDisabled: {
    type: Boolean,
    default: false,
  },
} as const;

export default defineComponent({
  name: "Checkbox",
  props,
  setup(props, { slots }) {
    const checkboxRef = ref(false);
    const size = {
      small: {
        x: "2",
        y: "1",
        text: "sm",
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base",
      },
      large: {
        x: "4",
        y: "2",
        text: "lg",
      },
    };
    return () => (
      <div>
        <input
          ref={checkboxRef}
          type="checkbox"
          class={`
            ${size[props.size].text}
            ${props.disabled || props.selectableDisabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
          style={{
            width: `${size[props.size].x}rem`,
            height: `${size[props.size].y}rem`
          }}
          disabled={props.disabled && !props.selectableDisabled}
          onClick={() => {
            if (!props.disabled) {
              checkboxRef.value = !checkboxRef.value;
            }
          }}
        />
        <label
          class={`
            ${size[props.size].text}
            ${props.disabled || props.selectableDisabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
        >
          {props.text}
          {slots.default ? slots.default() : ""}
        </label>
      </div>
    );
  },
});
