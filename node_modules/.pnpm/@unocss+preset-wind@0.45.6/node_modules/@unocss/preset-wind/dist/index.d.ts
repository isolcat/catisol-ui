import * as _unocss_core from '@unocss/core';
import { Rule, Variant, Preset } from '@unocss/core';
import * as _unocss_preset_mini from '@unocss/preset-mini';
import { Theme, PresetMiniOptions } from '@unocss/preset-mini';
export { Theme, colors, preflights } from '@unocss/preset-mini';

declare const rules: Rule[];

declare const shortcuts: _unocss_core.Shortcut<_unocss_preset_mini.Theme>[];

declare const theme: Theme;

declare const variants: (options: PresetWindOptions) => Variant<Theme>[];

interface PresetWindOptions extends PresetMiniOptions {
}
declare const presetWind: (options?: PresetWindOptions) => Preset<Theme>;

export { PresetWindOptions, presetWind as default, presetWind, rules, shortcuts, theme, variants };
