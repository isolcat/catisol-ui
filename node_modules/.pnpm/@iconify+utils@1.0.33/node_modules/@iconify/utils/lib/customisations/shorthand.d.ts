import { IconifyIconCustomisations } from './index.js';

/**
 * Additional shorthand customisations
 */
interface ShorthandIconCustomisations {
    flip?: string;
    align?: string;
}
/**
 * Apply "flip" string to icon customisations
 */
declare function flipFromString(custom: IconifyIconCustomisations, flip: string): void;
/**
 * Apply "align" string to icon customisations
 */
declare function alignmentFromString(custom: IconifyIconCustomisations, align: string): void;

export { ShorthandIconCustomisations, alignmentFromString, flipFromString };
