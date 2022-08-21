import * as vite from 'vite';
import { Plugin } from 'vite';
import { UserConfig, UnocssPluginContext, UserConfigDefaults } from '@unocss/core';

interface VitePluginConfig<Theme extends {} = {}> extends UserConfig<Theme> {
    /**
     * Enable UnoCSS inspector
     *
     * @default true
     */
    inspector?: boolean;
    /**
     * CSS Generation mode
     *
     * - `global` - generate a single CSS sheet for entire App
     * - `dist-chunk` - generate a CSS sheet for each code chunk on build, great for MPA
     * - `per-module` - generate a CSS sheet for each module, can be scoped
     * - `vue-scoped` - inject generated CSS to Vue SFC's `<style scoped>` for isolation
     * - `svelte-scoped` - inject generated CSS to Svelte's `<style>` for isolation
     * - `shadow-dom` - inject generated CSS to `Shadow DOM` css style block for each web component
     *
     * @default 'global'
     */
    mode?: 'global' | 'per-module' | 'vue-scoped' | 'svelte-scoped' | 'dist-chunk' | 'shadow-dom';
    /**
     * Transform CSS for `@apply` directive
     *
     * @experimental
     * @default false
     */
    transformCSS?: boolean | 'pre' | 'post';
    /**
     *
     * make the generate css processed by postcss(https://vitejs.dev/guide/features.html#postcss)
     * @default true
     */
    postcss?: boolean;
}

declare function ChunkModeBuildPlugin({ uno, filter }: UnocssPluginContext): Plugin;

declare function GlobalModeDevPlugin({ uno, tokens, affectedModules, onInvalidate, extract, filter }: UnocssPluginContext): Plugin[];

declare function GlobalModeBuildPlugin({ uno, ready, extract, tokens, filter, getConfig }: UnocssPluginContext<VitePluginConfig>): Plugin[];

declare function GlobalModePlugin(ctx: UnocssPluginContext): vite.Plugin[];

declare function PerModuleModePlugin({ uno, filter }: UnocssPluginContext): Plugin[];

declare function VueScopedPlugin({ uno, ready }: UnocssPluginContext): Plugin;

declare function SvelteScopedPlugin({ uno, ready }: UnocssPluginContext): Plugin;

declare function defineConfig<Theme extends {}>(config: VitePluginConfig<Theme>): VitePluginConfig<Theme>;
declare function UnocssPlugin<Theme extends {}>(configOrPath?: VitePluginConfig<Theme> | string, defaults?: UserConfigDefaults): Plugin[];

export { ChunkModeBuildPlugin, GlobalModeBuildPlugin, GlobalModeDevPlugin, GlobalModePlugin, PerModuleModePlugin, SvelteScopedPlugin, VitePluginConfig, VueScopedPlugin, UnocssPlugin as default, defineConfig };
