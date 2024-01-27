// Badge.tsx
import { defineComponent, PropType, VNode } from "vue";
import './badge.css'


export type BadgeType = "default" | "success" | "prompts" | "warnings";
export type BadgeSize = "small" | "medium" | "large";

export default defineComponent({
  name: "CBadge",
  props: {
    type: {
      type: String as PropType<BadgeType>,
      default: "default",
    },
    size: {
      type: String as PropType<BadgeSize>,
      default: "medium",
    },
    round: Boolean,
    content: String,
  },
  render() {
    const badgeClasses = [
      `badge`,
      `badge-${this.type}`,
      `badge-${this.size}`,
      this.round ? "badge-round" : "",
    ];
    
    const badge = (
      <span class={badgeClasses}>
        {this.content}
      </span>
    );
  
    return (
      <div class="badge-wrapper">
        {this.$slots.default && this.$slots.default()}
        {badge}
      </div>
    );
  },
});
