/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from './config/unocss';

// https://vitejs.dev/config/

export default defineConfig({
	build: {
		cssCodeSplit: true,
		lib: {
			entry: './src/entry.ts',
			name: 'CatIsolUI',
			fileName: 'catisol-ui', // 设置打包后的文件名为"catisol-ui"
			formats: [ 'esm', 'umd', 'iife' ]
		},
		rollupOptions: {
			// 移除assets文件夹下的哈希值
			output: {
				assetFileNames:'assets/[name][extname]',
				globals: {
					vue: 'Vue'
				}
			}
		}
	},
	test: {
		global: true,
		// 设置支持tsx和jsx组件
		transformMode: {
			tsx: 'jsx'
		},
		coverage: {
			reporter: [ 'text', 'json', 'html' ]
		},
		// 设置测试环境
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
			presets: [ presetUno(), presetAttributify(), presetIcons() ]
		}),
		vueJsx(),
		vue()
	]
});
