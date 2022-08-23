
import { createApp } from "vue/dist/vue.esm-browser";
import SmartyUI from './entry'

createApp({
    template: `
    <div>
        <SButton>普通按钮</SButton>
    </div>
    <div>
    <SButton color="blue">蓝色按钮</SButton>
    <SButton color="green">绿色按钮</SButton>
    <SButton color="gray">灰色按钮</SButton>
    <SButton color="yellow">黄色按钮</SButton>
    <SButton color="red">红色按钮</SButton>
   </div>
    `
})
    .use(SmartyUI)
    .mount("#app");
