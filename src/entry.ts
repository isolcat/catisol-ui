import { App } from "vue";
import MyButton from "./button/Button"
import Input from "./input";
import Link from "./link";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";

// 导出单独组件
export { MyButton, SFCButton, JSXButton, Input, Link }

// 编写一个插件，实现一个install方法

export default {
    install(app: App): void {
        app.component(MyButton.name, MyButton)
        app.component(SFCButton.name, SFCButton)
        app.component(JSXButton.name, JSXButton)
        app.component(Input.name, Input)
        app.component(Link.name, Link)
    }
}