import { Variant, VariantObject } from '@unocss/core';
import { T as Theme } from './types-9e30040a.js';
import { PresetMiniOptions } from './index.js';
import './colors-f2b5968c.js';
import './default-0fe8c7f8.js';
import './utilities-00da4436.js';

declare const variantBreakpoints: Variant<Theme>;

declare const variantCombinators: Variant[];

declare const variantPrint: Variant;
declare const variantCustomMedia: VariantObject;

declare const variantColorsMediaOrClass: (options?: PresetMiniOptions) => Variant[];

declare const variants: (options: PresetMiniOptions) => Variant<Theme>[];

declare const variantLanguageDirections: Variant[];

declare const variantSelector: Variant;
declare const variantCssLayer: Variant;
declare const variantInternalLayer: Variant;
declare const variantScope: Variant;
declare const variantVariables: Variant;

declare const variantPseudoClassesAndElements: VariantObject;
declare const variantPseudoClassFunctions: VariantObject;
declare const variantTaggedPseudoClasses: (options?: PresetMiniOptions) => VariantObject[];
declare const partClasses: VariantObject;

declare const variantImportant: Variant;

declare const variantNegative: Variant;

export { partClasses, variantBreakpoints, variantColorsMediaOrClass, variantCombinators, variantCssLayer, variantCustomMedia, variantImportant, variantInternalLayer, variantLanguageDirections, variantNegative, variantPrint, variantPseudoClassFunctions, variantPseudoClassesAndElements, variantScope, variantSelector, variantTaggedPseudoClasses, variantVariables, variants };
