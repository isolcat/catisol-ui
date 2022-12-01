import { defineComponent } from 'vue';
import "uno.css";

export default defineComponent({
    name:"CInput",
    setup() {
        return () => (
            <div class= "op80 text-lg fw300 m1 " >
                <input type= "text" placeholder="Please Input" class="b-rd-1" />
            </div>
        )
    }
})