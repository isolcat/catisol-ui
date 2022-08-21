import { IconifyIcon, IconifyOptional } from '@iconify/types';
import { FullIconifyIcon } from './index.js';

/**
 * Merge icon and alias
 */
declare function mergeIconData<T extends IconifyIcon | FullIconifyIcon>(icon: T, alias: IconifyOptional): T;

export { mergeIconData };
