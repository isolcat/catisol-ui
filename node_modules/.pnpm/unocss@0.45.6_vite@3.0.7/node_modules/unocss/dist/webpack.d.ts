import { WebpackPluginOptions } from '@unocss/webpack';
export * from '@unocss/webpack';

declare function UnocssWebpackPlugin<Theme extends {}>(configOrPath?: WebpackPluginOptions<Theme> | string): any;

export { UnocssWebpackPlugin as default };
