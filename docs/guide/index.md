# 🐱快速开始
`catisol-ui`作为目前为数不多的采用`UnoCSS`原子化CSS引擎来开发的Vue3组件库，我认为这很酷，尽管它还有很多的地方不完善，但我尽可能让该组件库做到让人眼前一亮
## 引入
这里当然就推荐pnpm
```shell
pnpm add catisol-ui
```
在`main.js`或`main.ts`添加：
```js
import { createApp } from 'vue';
import App from './App.vue';
import catisol from 'catisol-ui';

import 'catisol-ui/dist/assets/entry.css';

createApp(App).use(catisol).mount('#app');
```