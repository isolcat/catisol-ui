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

## AI帮你快速上手
我们很高兴宣布，`catisol-ui` 文档现已集成 ChatGPT 功能，旨在为您提供更快捷、更智能的帮助体验。无论您是刚开始使用 `catisol-ui`，还是已经是一个经验丰富的开发者，只需点击文档右上角的 **Ask AI** 按钮，就可以直接向 ChatGPT 提问了。

### 如何使用 Ask AI？

![ChatGPT in catisol-ui Docs](https://i.imgur.com/l63DglZ.png)

1. 看到疑惑？有问题需要解答？直接点击页面右上角的 **Ask AI** 按钮。
2. 在弹出的对话框中输入你对 `catisol-ui` 组件库的相关问题，无论是关于如何使用特定组件的详细信息，还是关于最佳实践的建议。
3. 提交问题后，ChatGPT 将提供即时的、详细的回答，帮助您解决问题，让您的开发工作更加顺畅。

### 为什么使用 ChatGPT？

- **快速响应**：即时获得关于 `catisol-ui` 使用和开发的问题解答。
- **深入了解**：更深入地理解组件库的特性和功能。
- **提高效率**：减少搜索解答所需的时间，让您可以更专注于开发。

### 尝试一下吧！

我们相信，通过 ChatGPT 的智能支持，您的 `catisol-ui` 开发体验将变得更加轻松和高效。现在就试试看，让 AI 成为您解决问题和学习的好伙伴！
