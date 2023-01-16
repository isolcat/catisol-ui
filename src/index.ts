
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
    <div>
        <CInput />
    </div>
    <div>
       <CLink href="#" type="primary" color="blue">Primary Link</CLink>
       <CLink href="#" type="success" color="green">Success Link</CLink>
       <CLink href="#" type="warning" color="yellow">Warning Link</CLink>
       <CLink href="#" type="danger" color="red">Danger Link</CLink>
       <CLink href="#" type="info" color="gray">Info Link</CLink>
    </div>
    <div>
        <CTitle size="small" color="red" text="This is a small red title" />
        <CTitle size="medium" color="blue" text="This is a medium blue title" />
        <CTitle size="large" color="green" text="This is a large green title">
    </div>
    `
})
    .use(CatIsolUI)
    .mount("#app");
