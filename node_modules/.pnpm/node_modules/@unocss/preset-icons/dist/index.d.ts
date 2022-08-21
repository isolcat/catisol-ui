import * as _unocss_core from '@unocss/core';
import { IconsOptions } from './core.js';
export { IconsOptions, combineLoaders, createPresetIcons } from './core.js';
import '@iconify/utils/lib/loader/types';
import '@iconify/types';

declare const presetIcons: (options?: IconsOptions) => _unocss_core.Preset<{}>;

export { presetIcons as default, presetIcons };
