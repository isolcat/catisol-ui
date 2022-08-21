import { Extractor, VariantObject, Preset } from '@unocss/core';

interface TagifyOptions {
    /**
     * The prefix to use for the tagify variant.
     */
    prefix?: string;
    /**
     * Tags excluded from processing.
     * @default ['b', /^h\d+$/, 'table']
     */
    excludedTags?: (string | RegExp)[];
    /**
     * Extra CSS properties to apply to matched rules
     */
    extraProperties?: Record<string, string> | ((matched: string) => Partial<Record<string, string>>);
    /**
     * Enable default extractor
     * @default true
     */
    defaultExtractor?: boolean;
}

declare const MARKER = "__TAGIFY__";
declare const htmlTagRE: RegExp;
declare const extractorTagify: (options: TagifyOptions) => Extractor;

declare const variantTagify: (options: TagifyOptions) => VariantObject;

declare function tagifyPreset(options?: TagifyOptions): Preset;

export { MARKER, TagifyOptions, tagifyPreset as default, extractorTagify, htmlTagRE, variantTagify };
