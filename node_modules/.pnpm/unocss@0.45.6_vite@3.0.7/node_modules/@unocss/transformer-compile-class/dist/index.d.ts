import { SourceCodeTransformer } from '@unocss/core';

interface CompileClassOptions {
    /**
     * Trigger string
     * @default ':uno:'
     */
    trigger?: string;
    /**
     * Prefix for compile class name
     * @default 'uno-'
     */
    classPrefix?: string;
    /**
     * Hash function
     */
    hashFn?: (str: string) => string;
    /**
     * Left unknown classes inside the string
     *
     * @default true
     */
    keepUnknown?: boolean;
    /**
     * The layer name of generated rules
     */
    layer?: string;
}
declare function transformerCompileClass(options?: CompileClassOptions): SourceCodeTransformer;

export { CompileClassOptions, transformerCompileClass as default };
