import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
const guideSidebar = [
    {
        text: '基础',
        items: [
            {
                text: '快速开始', link: '/guide/'
            }
        ]
    }
]

export default defineConfig({
    title: 'CatIsol-UI',
    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'CatIsol-UI',
        socialLinks: [
            {
                icon: 'github', link: 'https://github.com/isolcat'
            }
        ],
        nav: [
            { text: '指南', items: guideSidebar },
            { text: "组件", link: "/components/Button/index", activeMatch: "/components/Button/" },
        ],
        sidebar: [
            {
                text: '入门',
                items: [
                    { text: "快速上手", link: "/guide/index" }
                ]
            },
            {
                text: '组件',
                items: [
                    { text: '按钮', link: '/components/Button/index' }
                ]
            }
        ]
    },
    markdown: {
        config: (md) => {
            md.use(demoBlockPlugin);
        },
    },
})
