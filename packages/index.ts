import { createApp,ref  } from 'vue/dist/vue.esm-browser';
import CatIsolUI from './entry';
import 'uno.css';
import '@iconify-json/ic';

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
  <CTextarea placeholder="Enter your text here" />
  <CTextarea maxLength="100" showWordLimit />
  <CBadge type="success" size="small" round content="New">
      <CButton>Button</CButton>
  </CBadge>
  <CTabs v-model="activeTab">
  <div name="tab1" title="Tab 1">Content for Tab 1</div>
  <div name="tab2" title="Tab 2">Content for Tab 2</div>
  <div name="tab3" title="Tab 3">Content for Tab 3</div>
</CTabs>
  `,
  setup() {
    const activeTab = ref('tab1'); // 创建一个响应式的属性来存储当前激活的标签

    // 这里可以添加其他响应式属性或方法

    return {
        activeTab
        // 返回其他响应式属性或方法
    };
}
})
	.use(CatIsolUI)
	.mount('#app');
