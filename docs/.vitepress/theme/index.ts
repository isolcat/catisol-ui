import Theme from 'vitepress/theme'
import CatIsolUI from '../../../src/entry'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import './style/var.css'

export default {
    ...Theme,
    enhanceApp({ app }) {
        app.use(CatIsolUI)
        app.component('Demo', Demo)
        app.component('DemoBlock', DemoBlock)
    },
}