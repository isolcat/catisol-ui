import * as _unocss_core from '@unocss/core';
import { RGBAColorValue, CSSColorValue, VariantHandlerContext, VariantObject } from '@unocss/core';
export { C as CONTROL_MINI_NO_NEGATIVE, c as colorResolver, a as colorableShadows, d as directionSize, g as getComponent, e as getComponents, h as hasParseableColor, m as makeGlobalStaticRules, p as parseColor, r as resolveBreakpoints, b as resolveVerticalBreakpoints } from './utilities-00da4436.js';
import './types-9e30040a.js';

declare function hex2rgba(hex?: string): RGBAColorValue | undefined;
declare function parseCssColor(str?: string): CSSColorValue | undefined;
declare function colorOpacityToString(color: CSSColorValue): string | number;
declare function colorToString(color: CSSColorValue | string, alphaOverride?: string | number): string;

declare const directionMap: Record<string, string[]>;
declare const insetMap: Record<string, string[]>;
declare const cornerMap: Record<string, string[]>;
declare const xyzMap: Record<string, string[]>;
declare const positionMap: Record<string, string>;
declare const globalKeywords: string[];

declare function numberWithUnit(str: string): string | undefined;
declare function auto(str: string): "auto" | undefined;
declare function rem(str: string): string | undefined;
declare function px(str: string): string | undefined;
declare function number(str: string): string | undefined;
declare function percent(str: string): string | undefined;
declare function fraction(str: string): string | undefined;
declare function bracket(str: string): string | undefined;
declare function bracketOfColor(str: string): string | undefined;
declare function bracketOfLength(str: string): string | undefined;
declare function bracketOfPosition(str: string): string | undefined;
declare function cssvar(str: string): string | undefined;
declare function time(str: string): string | undefined;
declare function degree(str: string): string | undefined;
declare function global(str: string): string | undefined;
declare function properties(str: string): string | undefined;
declare function position(str: string): string | undefined;

declare const handlers_numberWithUnit: typeof numberWithUnit;
declare const handlers_auto: typeof auto;
declare const handlers_rem: typeof rem;
declare const handlers_px: typeof px;
declare const handlers_number: typeof number;
declare const handlers_percent: typeof percent;
declare const handlers_fraction: typeof fraction;
declare const handlers_bracket: typeof bracket;
declare const handlers_bracketOfColor: typeof bracketOfColor;
declare const handlers_bracketOfLength: typeof bracketOfLength;
declare const handlers_bracketOfPosition: typeof bracketOfPosition;
declare const handlers_cssvar: typeof cssvar;
declare const handlers_time: typeof time;
declare const handlers_degree: typeof degree;
declare const handlers_global: typeof global;
declare const handlers_properties: typeof properties;
declare const handlers_position: typeof position;
declare namespace handlers {
  export {
    handlers_numberWithUnit as numberWithUnit,
    handlers_auto as auto,
    handlers_rem as rem,
    handlers_px as px,
    handlers_number as number,
    handlers_percent as percent,
    handlers_fraction as fraction,
    handlers_bracket as bracket,
    handlers_bracketOfColor as bracketOfColor,
    handlers_bracketOfLength as bracketOfLength,
    handlers_bracketOfPosition as bracketOfPosition,
    handlers_cssvar as cssvar,
    handlers_time as time,
    handlers_degree as degree,
    handlers_global as global,
    handlers_properties as properties,
    handlers_position as position,
  };
}

declare const handler: _unocss_core.ValueHandler<"number" | "auto" | "global" | "position" | "numberWithUnit" | "rem" | "px" | "percent" | "fraction" | "bracket" | "bracketOfColor" | "bracketOfLength" | "bracketOfPosition" | "cssvar" | "time" | "degree" | "properties">;
declare const h: _unocss_core.ValueHandler<"number" | "auto" | "global" | "position" | "numberWithUnit" | "rem" | "px" | "percent" | "fraction" | "bracket" | "bracketOfColor" | "bracketOfLength" | "bracketOfPosition" | "cssvar" | "time" | "degree" | "properties">;

declare const variantMatcher: (name: string, handler: (input: VariantHandlerContext) => Record<string, any>) => VariantObject;
declare const variantParentMatcher: (name: string, parent: string) => VariantObject;

export { colorOpacityToString, colorToString, cornerMap, directionMap, globalKeywords, h, handler, hex2rgba, insetMap, parseCssColor, positionMap, handlers as valueHandlers, variantMatcher, variantParentMatcher, xyzMap };
