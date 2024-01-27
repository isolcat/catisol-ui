import { defineComponent, PropType } from "vue";
import "uno.css"

export type IShape = "circle" | "square";
export type ISize = "small" | "medium" | "large";

export const props = {
  shape: {
    type: String as PropType<IShape>,
    default: "rounded-full",
  },
  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },
  src: {
    type: String,
    required: true,
  },
} as const;

export default defineComponent({
  name: "CAvatar",
  props,
  setup(props) {
    const size = {
      small: {
        width: "2rem",
        height: "2rem",
      },
      medium: {
        width: "3rem",
        height: "3rem",
      },
      large: {
        width: "4rem",
        height: "4rem",
      },
    };

    return () => (
      <div>
        <img
          src={props.src}
          class={`avatar ${props.shape} ${props.size}`}
          style={{
            width: size[props.size].width,
            height: size[props.size].height,
          }}
        />
      </div>
    );
  },
});
