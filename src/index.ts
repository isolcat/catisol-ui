
import { createApp } from "vue/dist/vue.esm-browser";
import CatIsolUI from './entry'
import 'unocss'
import '@iconify-json/ic'

createApp({
    template: `
    <div>
        <CButton>普通按钮</CButton>
    </div>
    <div>
        <CButton color="blue">蓝色按钮</CButton>
        <CButton color="green">绿色按钮</CButton>
        <CButton color="gray">灰色按钮</CButton>
        <CButton color="yellow">黄色按钮</CButton>
        <CButton color="red">红色按钮</CButton>
   </div>
   <div>
        <CButton color="blue" round plain icon="search" ></CButton>
        <CButton color="green" round plain icon="edit" ></CButton>
        <CButton color="gray" round plain icon="check" ></CButton>
        <CButton color="yellow" round plain icon="message" ></CButton>
        <CButton color="red" round plain icon="delete" ></CButton>
    </div>
    `
})
    .use(CatIsolUI)
    .mount("#app");
