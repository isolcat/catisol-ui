import { VitePluginConfig } from '@unocss/vite';
export * from '@unocss/vite';
import { Plugin } from 'vite';

declare function UnocssVitePlugin<Theme extends {}>(configOrPath?: VitePluginConfig<Theme> | string): Plugin[];

export { UnocssVitePlugin as default };
