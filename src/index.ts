
import { createApp } from "vue/dist/vue.esm-browser";
import SmartyUI from './entry'

createApp({
    template: `
    <div>
        <SButton>普通按钮</SButton>
    </div>
    `
})
    .use(SmartyUI)
    .mount("#app");
