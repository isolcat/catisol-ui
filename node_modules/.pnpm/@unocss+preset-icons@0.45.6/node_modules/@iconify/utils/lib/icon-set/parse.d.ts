import { IconifyAlias, IconifyJSON } from '@iconify/types';
import { FullIconifyIcon } from '../icon/index.js';

/**
 * Which aliases to parse:
 *
 * none - do not parse aliases
 * all - parse all aliases
 * variations - parse only aliases that have transformations (can be considered to be different icon)
 */
declare type ParseIconSetAliases = 'none' | 'all' | 'variations';
/**
 * Callback to call for each icon.
 *
 * If data === null, icon is missing.
 */
declare type SplitIconSetCallback = (name: string, data: FullIconifyIcon | null) => void;
/**
 * Check if alias is a variation
 */
declare function isVariation(item: IconifyAlias): boolean;
interface ParseIconSetOptions {
    aliases?: ParseIconSetAliases;
}
/**
 * Extract icons from an icon set
 *
 * Returns list of icons that were found in icon set
 */
declare function parseIconSet(data: IconifyJSON, callback: SplitIconSetCallback, options?: ParseIconSetOptions): string[];

export { ParseIconSetAliases, ParseIconSetOptions, SplitIconSetCallback, isVariation, parseIconSet };
