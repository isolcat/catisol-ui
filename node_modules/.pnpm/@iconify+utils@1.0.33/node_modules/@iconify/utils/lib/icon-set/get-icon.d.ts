import { IconifyJSON, IconifyIcon } from '@iconify/types';
import { FullIconifyIcon } from '../icon/index.js';

/**
 * Get data for icon
 */
declare function getIconData(data: IconifyJSON, name: string, full: true): FullIconifyIcon | null;
declare function getIconData(data: IconifyJSON, name: string, full: false): IconifyIcon | null;

export { getIconData };
