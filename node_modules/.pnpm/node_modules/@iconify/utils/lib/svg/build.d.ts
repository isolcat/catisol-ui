import { FullIconifyIcon } from '../icon/index.js';
import { FullIconCustomisations } from '../customisations/index.js';
import '@iconify/types';

/**
 * Interface for getSVGData() result
 */
interface IconifyIconBuildResult {
    attributes: {
        width: string;
        height: string;
        preserveAspectRatio: string;
        viewBox: string;
    };
    body: string;
    inline?: boolean;
}
/**
 * Get SVG attributes and content from icon + customisations
 *
 * Does not generate style to make it compatible with frameworks that use objects for style, such as React.
 * Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
 *
 * Customisations should be normalised by platform specific parser.
 * Result should be converted to <svg> by platform specific parser.
 * Use replaceIDs to generate unique IDs for body.
 */
declare function iconToSVG(icon: FullIconifyIcon, customisations: FullIconCustomisations): IconifyIconBuildResult;

export { IconifyIconBuildResult, iconToSVG };
