import { defineConfig } from 'vitepress';
const guideSidebar = [
	{
		text: '基础',
		items: [
			{
				text: '快速开始',
				link: '/guide/'
			},
			{
				text: '为什么选择它',
				link: '/guide/why'
			}
		]
	}
];
const project = [
	{
		text: '项目',
		items: [
			{
				text: 'babel-plugin-testdev',
				link: 'https://github.com/isolcat/babel-plugin-testdev'
			},
			{
				text: 'isolcat-cli',
				link: 'https://github.com/isolcat/isolcat-cli'
			},
			{
				text: 'JustRead',
				link: 'https://github.com/isolcat/JustRead'
			}
		]
	}
];

export default defineConfig({
	title: 'CatIsol-UI',
	themeConfig: {
		logo: '/logo.png',
		siteTitle: 'CatIsol-UI',
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/isolcat'
			}
		],
		nav: [
			{ text: '指南', items: guideSidebar },
			{ text: '组件', link: '/components/Button/button', activeMatch: '/components/Button/' },
			{ text: '生态系统', items: project }
		],
		sidebar: [
			{
				text: '入门',
				items: [ { text: '快速上手', link: '/guide/index' }, { text: '为什么选择它', link: '/guide/why' } ]
			},
			{
				text: '组件',
				items: [
					{ text: 'Button 按钮', link: '/components/Button/button' },
					{ text: 'Link 链接', link: '/components/Link/link' },
					{ text: 'Title 标题', link: '/components/Title/title' },
					{ text: 'Avatar 头像', link: '/components/Avatar/avatar' }
				]
			},
			{
				text: '表单',
				items: [
					{ text: 'CheckBox 复选框', link: '/components/CheckBox/checkbox' },
					{ text: 'Input 输入框', link: '/components/Input/input' },
					{ text: 'Switch 开关', link: '/components/Switch/switch' },
					{ text: 'Textarea 文本域', link: '/components/Textarea/textarea' },
					{ text: 'Select 选择器', link: '/components/Select/select' }
				]
			},
			{
				text: '数据展示',
				items: [ { text: 'ScrollContent 内容滚动框', link: '/components/ScrollContent/scrollcontent' } ]
			}
		]
	},
	markdown: {
		config: (md) => {}
	}
});
