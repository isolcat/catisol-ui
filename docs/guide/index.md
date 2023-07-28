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


## 为什么选择该框架
- ⚡`UnoCSS`原子化引擎，让该组件库具有着其他组件库无法比拟的轻量与高性能
- 😶‍🌫️使用`vitest`进行单元测试，无需担心组件库的稳定性和可靠性
- 🛠️`tsx`构建组件库，源码可读性强，维护性强
- 😽使用`vite`进行打包，组件库引入的体积无需担心