import { defineComponent } from 'vue';
import "uno.css";

export default defineComponent({
    name:"CInput",
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return () => (
            <div class= "op80 text-lg fw300 m1" >
                <input type="text" placeholder="Please Input" class="b-rd-1" disabled={props.disabled} />
            </div>
        )
    }
})
