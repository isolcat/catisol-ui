
import { createApp } from "vue/dist/vue.esm-browser";
import CatIsolUI from './entry'
import 'uno.css'
import '@iconify-json/ic'

createApp({
  template: `
    <div>
        <CButton disabled>普通按钮</CButton>
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
        <CInput disabled />
    </div>
    <div>
       <CLink disabled href="#" type="primary" color="blue">Primary Link</CLink>
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
    <div style="display: flex">
    <Checkbox   size="medium"
      text="Select me"
      shape="circle"
    />
    <Checkbox shape="circle"  size="small" shape="circle" text="Or select me"
    />
    <Checkbox   size="large"
      text="Select me"
      disabled
    />
  </div>
  <CAvatar src="https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c"  shape="square" size="large"></CAvatar>
  <CAvatar src="https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c"  size="large"></CAvatar>
  <CAvatar src="https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c"  size="small"></CAvatar>
  <CSwitch size="small" checked/>  
  <CSwitch size="medium"/>  
  <CSwitch size="large"/>  
  <CSwitch size="large" disabled/>  
   <div class="container mx-auto">
    <Collapse title="收缩面板" initialExpanded>
      <p>这是一个展开的面板。</p>
      <p>你可以在这里添加需要展示的内容。</p>
      <p>当你再次点击标题时，这个面板将会折叠起来。</p>
    </Collapse>
    <Collapse title="另一个收缩面板">
      <p>这是另一个展开的面板。</p>
      <p>你也可以在这里添加需要展示的内容。</p>
      <p>同样，当你再次点击标题时，这个面板将会折叠起来。</p>
    </Collapse>
  </div>

  `
})
  .use(CatIsolUI)
  .mount("#app");
