import { defineComponent,PropType,ref } from "vue";
import "uno.css";

export type ITitleSize = "small" | "medium" | "large";
export type ITitleColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'

export const props = {
  size: {
    type: String as PropType<ITitleSize>,
    default: "medium",
  },
  color: {
    type: String as PropType<ITitleColor>,
    default: "blue",
  },
  text: {
    type: String,
    default: "",
  },
} as const;

export default defineComponent({
  name: "CTitle",
  props,
  setup(props, { slots }) {
    const size = {
      small: {
        x: "4",
        text: "sm",
      },
      medium: {
        x: "2",
        text: "base",
      },
      large: {
        x: "3",
        text: "lg",
      },
    };

    return () => (
      <p
        class={`
          text-${props.color}-500
          text-${size[props.size].x}xl
          `}
      >
        {props.text}
        {slots.default ? slots.default() : ""}
      </p>
    );
  },
});
