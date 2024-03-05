/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from './config/unocss';
import Components from 'unplugin-vue-components/vite'; // 更新这里

export default defineConfig({
	resolve: {
		dedupe: ['vue']
	},
	build: {
		cssCodeSplit: true,
		lib: {
			entry: resolve(__dirname, './packages/entry.ts'),
			name: 'CatIsolUI',
			fileName: (format) => `catisol-ui.${format}.js`, // 根据格式设置打包后的文件名
			formats: ['esm', 'umd', 'iife']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				assetFileNames: 'assets/[name][extname]',
				globals: {
					vue: 'Vue'
				}
			}
		},
	},
	test: {
		global: true,
		transformMode: {
			tsx: 'jsx'
		},
		coverage: {
			reporter: ['text', 'json', 'html']
		},
		environment: 'happy-dom'
	},
	server: {
		hmr: {
			overlay: false
		}
	},
	plugins: [
		// 添加UnoCSS和JSX插件
		Unocss({
			presets: [presetUno(), presetAttributify(), presetIcons()]
		}),
		vueJsx(),
		vue(),
		Components({
			dirs: ['packages/*'],
			extensions: ['vue'],
			deep: true, // 如果组件分布在子目录的多个层级中，确保设置为true
		}),
	]
});
