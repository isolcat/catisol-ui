import { defineConfig } from "vite";
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from "../config/unocss";

export default defineConfig({
    plugins: [
        // 添加jsx插件
        vueJsx(),
        Unocss()
    ]
})