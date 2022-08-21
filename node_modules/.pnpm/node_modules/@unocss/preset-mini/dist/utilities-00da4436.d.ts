import { DynamicMatcher, ParsedColorValue, CSSObject, VariantContext, Rule } from '@unocss/core';
import { T as Theme } from './types-9e30040a.js';

declare const CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";
/**
 * Provide {@link DynamicMatcher} function returning spacing definition. See spacing rules.
 *
 * @param {string} propertyPrefix - Property for the css value to be created. Postfix will be appended according to direction matched.
 * @see {@link directionMap}
 */
declare function directionSize(propertyPrefix: string): DynamicMatcher;
/**
 * Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
 * See also color.tests.ts for more examples.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * '[rgb(100,2,3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
 *
 * @param {string} body - Color string to be parsed.
 * @param {Theme} theme - {@link Theme} object.
 * @return {ParsedColorValue|undefined}  {@link ParsedColorValue} object if string is parseable.
 */
declare function parseColor(body: string, theme: Theme): ParsedColorValue | undefined;
/**
 * Provide {@link DynamicMatcher} function to produce color value matched from rule.
 *
 * @see {@link parseColor}
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @example Resolving 'red-100' from theme:
 * colorResolver('background-color', 'background')('', 'red-100')
 * return { '--un-background-opacity': '1', 'background-color': 'rgba(254,226,226,var(--un-background-opacity))' }
 *
 * @example Resolving 'red-100/20' from theme:
 * colorResolver('background-color', 'background')('', 'red-100/20')
 * return { 'background-color': 'rgba(204,251,241,0.22)' }
 *
 * @example Resolving 'hex-124':
 * colorResolver('color', 'text')('', 'hex-124')
 * return { '--un-text-opacity': '1', 'color': 'rgba(17,34,68,var(--un-text-opacity))' }
 *
 * @param {string} property - Property for the css value to be created.
 * @param {string} varName - Base name for the opacity variable.
 * @return {@link DynamicMatcher} object.
 */
declare function colorResolver(property: string, varName: string, shouldPass?: (css: CSSObject) => boolean): DynamicMatcher;
declare function colorableShadows(shadows: string | string[], colorVar: string): string[];
declare function hasParseableColor(color: string | undefined, theme: Theme): boolean;
declare function resolveBreakpoints({ theme, generator }: Readonly<VariantContext<Theme>>): Record<string, string> | undefined;
declare function resolveVerticalBreakpoints({ theme, generator }: Readonly<VariantContext<Theme>>): Record<string, string> | undefined;
declare function makeGlobalStaticRules(prefix: string, property?: string): Rule<{}>[];
declare function getComponent(str: string, open: string, close: string, separator: string): string[] | undefined;
declare function getComponents(str: string, separator: string, limit?: number): string[] | undefined;

export { CONTROL_MINI_NO_NEGATIVE as C, colorableShadows as a, resolveVerticalBreakpoints as b, colorResolver as c, directionSize as d, getComponents as e, getComponent as g, hasParseableColor as h, makeGlobalStaticRules as m, parseColor as p, resolveBreakpoints as r };
