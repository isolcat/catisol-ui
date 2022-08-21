import { Preset } from '@unocss/core';
import { PresetMiniOptions, Theme } from '@unocss/preset-mini';
export { Theme } from '@unocss/preset-mini';

interface PresetUnoOptions extends PresetMiniOptions {
}
declare const presetUno: (options?: PresetUnoOptions) => Preset<Theme>;

export { PresetUnoOptions, presetUno as default, presetUno };
