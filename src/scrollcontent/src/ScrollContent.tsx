import { defineComponent } from 'vue'
import './ScrollContent.less'

export default  defineComponent({
  name: 'CScrollContent',
  setup(props, { slots }) {
    return () => (
      <div class="scroll-content-box">
        <div class="scroll-wrap">
          <div class="scroll-item">
            { slots.default?.() }
          </div>
        </div>
      </div>
    )
  }
})