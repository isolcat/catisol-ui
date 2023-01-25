

# 快速开始
`CatIsol` is a mini version of a component library based on vite development.
## 引入
这里当然就推荐pnpm
```shell
pnpm add catisol-ui
```
在`main.js`或`main.ts`添加：
```js
import { createApp } from 'vue'
import App from './App.vue'
import catisol from 'catisol-ui'

import 'catisol-ui/dist/assets/entry.67bddf0c.css'

import './assets/main.css'

createApp(App).use(catisol).mount('#app')
```


## Features
- ⚡️ Vue 3, Vite 2, pnpm, ESBuild - born with fastness
- 🦾 TypeScript, of course
- 🗂 File based routing
- ⚙️ Unit Testing with Vitest
- 😃 Eslint + Prittier
- 🎨 UnoCSS - the instant on-demand atomic CSS engine
- 🌍 I18n ready
- 🚘 CI/CD with GithubActions