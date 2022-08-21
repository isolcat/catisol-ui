import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/

const rollupOptions = {

    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    }
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
        // 添加UnoCSS插件
        Unocss({
            presets: [presetUno(), preseAttributify(), presetIcons()],
        }),
        // 添加JSX插件
        vueJsx({

        }),
        vue()],

});