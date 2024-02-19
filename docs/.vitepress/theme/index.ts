import CatIsolUI from '../../../packages/entry.ts'
import Theme from 'vitepress/theme'
import './style/var.css'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'

export default {
    ...Theme,
    ...DefaultTheme,
    Layout: h(DefaultTheme.Layout, null, {
        'nav-bar-content-before': () => h(Documate, {
            endpoint: 'https://dv2wvy9xxb.us.aircode.run/ask',
        }),
    }),
    enhanceApp({ app }) {
        app.use(CatIsolUI)
    },
}
