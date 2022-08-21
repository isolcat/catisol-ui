import { extractorSplit } from '@unocss/core';

const MARKER = "__TAGIFY__";
const htmlTagRE = /<([\w\d-:]+)/g;
const extractorTagify = (options) => {
  const {
    prefix = "",
    excludedTags = ["b", /^h\d+$/, "table"]
  } = options;
  return {
    name: "tagify",
    extract({ code }) {
      return new Set(
        Array.from(code.matchAll(htmlTagRE)).filter(({ 1: match }) => {
          for (const exclude of excludedTags) {
            if (typeof exclude === "string") {
              if (match === exclude)
                return false;
            } else {
              if (exclude.test(match))
                return false;
            }
          }
          return match.startsWith(prefix);
        }).map(([, matched]) => `${MARKER}${matched}`)
      );
    }
  };
};

const variantTagify = (options) => {
  const { extraProperties } = options;
  const prefix = `${MARKER}${options.prefix ?? ""}`;
  return {
    name: "tagify",
    match(input) {
      if (!input.startsWith(prefix))
        return;
      const matcher = input.slice(prefix.length);
      const handler = {
        matcher,
        selector: (i) => i.slice(MARKER.length + 1)
      };
      if (extraProperties) {
        if (typeof extraProperties === "function")
          handler.body = (entries) => [...entries, ...Object.entries(extraProperties(matcher) ?? {})];
        else
          handler.body = (entries) => [...entries, ...Object.entries(extraProperties)];
      }
      return handler;
    }
  };
};

function tagifyPreset(options = {}) {
  const {
    defaultExtractor = true
  } = options;
  const variants = [
    variantTagify(options)
  ];
  const extractors = [
    extractorTagify(options)
  ];
  if (defaultExtractor)
    extractors.push(extractorSplit);
  return {
    name: "@unocss/preset-tagify",
    variants,
    extractors
  };
}

export { MARKER, tagifyPreset as default, extractorTagify, htmlTagRE, variantTagify };
