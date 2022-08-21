import { CSSObject, Preset } from '@unocss/core';

/**
 * @public
 */
interface TypographyOptions {
    /**
     * The selector name to use the typographic utilities.
     * To undo the styles to the elements, use it like
     * `not-${selectorName}` which is by default `not-prose`.
     *
     * Note: `not` utility is only available in class mode.
     *
     * @defaultValue `prose`
     */
    selectorName?: string;
    /**
     * Extend or override CSS selectors with CSS declaration block.
     *
     * @defaultValue undefined
     */
    cssExtend?: Record<string, CSSObject>;
    /**
     * @deprecated use `selectorName` instead. It will be removed in 1.0.
     */
    className?: string;
}
/**
 * UnoCSS Preset for Typography
 *
 * ```js
 * // unocss.config.js
 * import { presetAttributify, presetUno, defineConfig, presetTypography } from 'unocss'
 *
 * export default defineConfig({
 *   presets: [
 *     presetAttributify(), // required if using attributify mode
 *     presetUno(), // required
 *     presetTypography()
 *   ]
 * })
 * ```
 *
 * @returns typography preset
 * @public
 */
declare function presetTypography(options?: TypographyOptions): Preset;

export { TypographyOptions, presetTypography as default, presetTypography };
