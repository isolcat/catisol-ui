import CatIsolUI from '../../../packages/entry.ts'
import Theme from 'vitepress/theme'
import './style/var.css'

export default {
    ...Theme,
    enhanceApp({ app }) {
        app.use(CatIsolUI)
    },
}
