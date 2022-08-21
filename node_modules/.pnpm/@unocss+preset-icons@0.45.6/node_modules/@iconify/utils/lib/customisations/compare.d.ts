import { FullIconCustomisations } from './index.js';

/**
 * Compare sets of cusotmisations, return false if they are different, true if the same
 *
 * If dimensions are derived from props1 or props2, do not compare them.
 */
declare function compare(item1: FullIconCustomisations, item2: FullIconCustomisations, compareDimensions?: boolean): boolean;

export { compare };
