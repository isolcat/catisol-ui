import { SourceCodeTransformer, UnoGenerator } from '@unocss/core';
import MagicString from 'magic-string';

interface TransformerDirectivesOptions {
    enforce?: SourceCodeTransformer['enforce'];
    /**
     * Treat CSS variables as directives for CSS syntax compatible.
     *
     * Pass `false` to disable, or a string to use as a prefix.
     *
     * @default '--at-'
     */
    varStyle?: false | string;
    /**
     * Throw an error if utils or themes are not found.
     *
     * @default true
     */
    throwOnMissing?: boolean;
}
declare function transformerDirectives(options?: TransformerDirectivesOptions): SourceCodeTransformer;
declare function transformDirectives(code: MagicString, uno: UnoGenerator, options: TransformerDirectivesOptions, filename?: string, originalCode?: string, offset?: number): Promise<void>;

export { TransformerDirectivesOptions, transformerDirectives as default, transformDirectives };
