import { defineComponent, h } from "vue";

export default defineComponent({
    name: "SButton",

    render() {
        return h("button", null, "MyButton");
    }
})