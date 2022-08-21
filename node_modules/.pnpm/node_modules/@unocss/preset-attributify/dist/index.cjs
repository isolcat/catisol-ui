'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@unocss/core');

const variantsRE = /^(?!\[(?:[^:]+):(?:.+)\]$)((?:.+:)?!?)?(.*)$/;
const variantAttributify = (options = {}) => {
  const prefix = options.prefix ?? "un-";
  const prefixedOnly = options.prefixedOnly ?? false;
  const trueToNonValued = options.trueToNonValued ?? false;
  return {
    name: "attributify",
    match(input) {
      const match = core.isAttributifySelector(input);
      if (!match)
        return;
      let name = match[1];
      if (name.startsWith(prefix))
        name = name.slice(prefix.length);
      else if (prefixedOnly)
        return;
      const content = match[2];
      const [, variants = "", body = content] = content.match(variantsRE) || [];
      if (body === "~" || trueToNonValued && body === "true" || !body)
        return `${variants}${name}`;
      else
        return `${variants}${name}-${body}`;
    }
  };
};

const elementRE$1 = /(<\w[\w:\.$-]*\s)((?:'[^>]*?'|"[^>]*?"|`[^>]*?`|\{[^>]*?\}|[^>]*?)*)/g;
const valuedAttributeRE$1 = /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-]+)(?:=("[^"]*|'[^']*))?/g;
const splitterRE$1 = /[\s'"`;>]+/;
const autocompleteExtractorAttributify = {
  name: "attributify",
  extract: ({ content, cursor }) => {
    const matchedElements = content.matchAll(elementRE$1);
    let attrs;
    let elPos = 0;
    for (const match of matchedElements) {
      const [, prefix, content2] = match;
      const currentPos2 = match.index + prefix.length;
      if (cursor > currentPos2 && cursor <= currentPos2 + content2.length) {
        elPos = currentPos2;
        attrs = content2;
        break;
      }
    }
    if (!attrs)
      return null;
    const matchedAttributes = attrs.matchAll(valuedAttributeRE$1);
    let attrsPos = 0;
    let attrName;
    let attrValues;
    for (const match of matchedAttributes) {
      const [matched, name, rawValues] = match;
      const currentPos2 = elPos + match.index;
      if (cursor > currentPos2 && cursor <= currentPos2 + matched.length) {
        attrsPos = currentPos2;
        attrName = name;
        attrValues = rawValues?.slice(1);
        break;
      }
    }
    if (!attrName)
      return null;
    if (attrName === "class" || attrName === "className" || attrName === ":class")
      return null;
    if (attrValues === void 0) {
      return {
        extracted: attrName,
        resolveReplacement(suggestion) {
          return {
            start: attrsPos,
            end: attrsPos + attrName.length,
            replacement: suggestion
          };
        }
      };
    }
    const attrValuePos = attrsPos + attrName.length + 2;
    let matchSplit = splitterRE$1.exec(attrValues);
    let currentPos = 0;
    let value;
    while (matchSplit) {
      const [matched] = matchSplit;
      if (cursor > attrValuePos + currentPos && cursor <= attrValuePos + currentPos + matchSplit.index) {
        value = attrValues.slice(currentPos, currentPos + matchSplit.index);
        break;
      }
      currentPos += matchSplit.index + matched.length;
      matchSplit = splitterRE$1.exec(attrValues.slice(currentPos));
    }
    if (value === void 0)
      value = attrValues.slice(currentPos);
    const [, variants = "", body] = value.match(variantsRE) || [];
    return {
      extracted: `${variants}${attrName}-${body}`,
      transformSuggestions(suggestions) {
        return suggestions.filter((v) => v.startsWith(`${variants}${attrName}-`)).map((v) => variants + v.slice(variants.length + attrName.length + 1));
      },
      resolveReplacement(suggestion) {
        return {
          start: currentPos + attrValuePos,
          end: currentPos + attrValuePos + value.length,
          replacement: variants + suggestion.slice(variants.length + attrName.length + 1)
        };
      }
    };
  }
};

const strippedPrefixes = [
  "v-bind:",
  ":"
];
const splitterRE = /[\s'"`;]+/g;
const elementRE = /<\w(?=.*>)[\w:\.$-]*\s((?:['"`\{].*?['"`\}]|.*?)*?)>/gs;
const valuedAttributeRE = /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:!%-]+)(?:={?(["'])([^\2]*?)\2}?)?/g;
const defaultIgnoreAttributes = ["placeholder"];
const extractorAttributify = (options) => {
  const ignoreAttributes = options?.ignoreAttributes ?? defaultIgnoreAttributes;
  const nonValuedAttribute = options?.nonValuedAttribute ?? true;
  const trueToNonValued = options?.trueToNonValued ?? false;
  return {
    name: "attributify",
    extract({ code }) {
      const result = Array.from(code.matchAll(elementRE)).flatMap((match) => Array.from((match[1] || "").matchAll(valuedAttributeRE))).flatMap(([, name, _, content]) => {
        if (ignoreAttributes.includes(name))
          return [];
        for (const prefix of strippedPrefixes) {
          if (name.startsWith(prefix)) {
            name = name.slice(prefix.length);
            break;
          }
        }
        if (!content) {
          if (core.isValidSelector(name) && nonValuedAttribute !== false) {
            const result2 = [`[${name}=""]`];
            if (trueToNonValued)
              result2.push(`[${name}="true"]`);
            return result2;
          }
          return [];
        }
        if (["class", "className"].includes(name)) {
          return content.split(splitterRE).filter(core.isValidSelector);
        } else {
          return content.split(splitterRE).filter(Boolean).map((v) => `[${name}~="${v}"]`);
        }
      });
      return new Set(result);
    }
  };
};

const preset = (options = {}) => {
  options.strict = options.strict ?? false;
  options.prefix = options.prefix ?? "un-";
  options.prefixedOnly = options.prefixedOnly ?? false;
  options.nonValuedAttribute = options.nonValuedAttribute ?? true;
  options.ignoreAttributes = options.ignoreAttributes ?? defaultIgnoreAttributes;
  const variants = [
    variantAttributify(options)
  ];
  const extractors = [
    extractorAttributify(options)
  ];
  const autocompleteExtractors = [
    autocompleteExtractorAttributify
  ];
  if (!options.strict)
    extractors.unshift(core.extractorSplit);
  return {
    name: "@unocss/preset-attributify",
    variants,
    extractors,
    options,
    autocomplete: {
      extractors: autocompleteExtractors
    }
  };
};

exports.autocompleteExtractorAttributify = autocompleteExtractorAttributify;
exports["default"] = preset;
exports.defaultIgnoreAttributes = defaultIgnoreAttributes;
exports.extractorAttributify = extractorAttributify;
exports.variantAttributify = variantAttributify;
exports.variantsRE = variantsRE;
