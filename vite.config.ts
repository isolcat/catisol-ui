import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/

const rollupOptions = {

    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    },
};


export default defineConfig({
    // 添加哭模式配置
    build: {
        rollupOptions,
        minify: false,
        lib: {
            entry: "./src/entry.ts",
            name: "SmartyUI",
            fileName: "smarty-ui",
            // 导出模块格式
            formats: ["esm", "umd", "iife"],
        },
    },
    plugins: [
        // 添加JSX插件
        vueJsx({

        }),
        vue()],

});