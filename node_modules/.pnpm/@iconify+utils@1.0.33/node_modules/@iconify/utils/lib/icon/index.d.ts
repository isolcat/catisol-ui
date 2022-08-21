import { IconifyIcon, IconifyOptional } from '@iconify/types';
export { IconifyIcon } from '@iconify/types';

declare type FullIconifyIcon = Required<IconifyIcon>;
/**
 * Expression to test part of icon name.
 */
declare const matchName: RegExp;
/**
 * Default values for all optional IconifyIcon properties
 */
declare const iconDefaults: Required<IconifyOptional>;
/**
 * Add optional properties to icon
 */
declare function fullIcon(data: IconifyIcon): FullIconifyIcon;

export { FullIconifyIcon, fullIcon, iconDefaults, matchName };
