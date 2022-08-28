import Theme from 'vitepress/dist/client/theme-default'
import SmartyUI from '../../../src/entry'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'


export default {
    ...Theme,
    enhanceApp({ app }) {
        app.use(SmartyUI)
        app.component('Demo', Demo)
        app.component('DemoBlock', DemoBlock)
    },
}