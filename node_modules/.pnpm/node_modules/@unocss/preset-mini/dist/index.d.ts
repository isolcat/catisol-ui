import { Preflight, PresetOptions, Preset } from '@unocss/core';
export { c as colors } from './colors-f2b5968c.js';
export { t as theme } from './default-0fe8c7f8.js';
import { T as Theme } from './types-9e30040a.js';
export { T as Theme, a as ThemeAnimation } from './types-9e30040a.js';
export { p as parseColor } from './utilities-00da4436.js';

declare const preflights: Preflight[];

interface DarkModeSelectors {
    /**
     * Selector for light variant.
     *
     * @default '.light'
     */
    light?: string;
    /**
     * Selector for dark variant.
     *
     * @default '.dark'
     */
    dark?: string;
}
interface PresetMiniOptions extends PresetOptions {
    /**
     * Dark mode options
     *
     * @default 'class'
     */
    dark?: 'class' | 'media' | DarkModeSelectors;
    /**
     * Generate pesudo selector as `[group=""]` instead of `.group`
     *
     * @default false
     */
    attributifyPseudo?: Boolean;
    /**
     * Prefix for CSS variables.
     *
     * @default 'un-'
     */
    variablePrefix?: string;
    /**
     * Utils prefix
     *
     * @default undefined
     */
    prefix?: string;
}
declare const presetMini: (options?: PresetMiniOptions) => Preset<Theme>;

export { DarkModeSelectors, PresetMiniOptions, presetMini as default, preflights, presetMini };
