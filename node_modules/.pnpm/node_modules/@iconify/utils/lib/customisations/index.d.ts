/**
 * Icon alignment
 */
declare type IconifyHorizontalIconAlignment = 'left' | 'center' | 'right';
declare type IconifyVerticalIconAlignment = 'top' | 'middle' | 'bottom';
/**
 * Icon size
 */
declare type IconifyIconSize = null | string | number;
/**
 * Icon customisations
 */
interface IconifyIconCustomisations {
    inline?: boolean;
    width?: IconifyIconSize;
    height?: IconifyIconSize;
    hAlign?: IconifyHorizontalIconAlignment;
    vAlign?: IconifyVerticalIconAlignment;
    slice?: boolean;
    hFlip?: boolean;
    vFlip?: boolean;
    rotate?: number;
}
declare type FullIconCustomisations = Required<IconifyIconCustomisations>;
/**
 * Default icon customisations values
 */
declare const defaults: FullIconCustomisations;
/**
 * Convert IconifyIconCustomisations to FullIconCustomisations
 */
declare function mergeCustomisations(defaults: FullIconCustomisations, item: IconifyIconCustomisations): FullIconCustomisations;

export { FullIconCustomisations, IconifyHorizontalIconAlignment, IconifyIconCustomisations, IconifyIconSize, IconifyVerticalIconAlignment, defaults, mergeCustomisations };
