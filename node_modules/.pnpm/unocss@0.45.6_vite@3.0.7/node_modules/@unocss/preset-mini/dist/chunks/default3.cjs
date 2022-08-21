'use strict';

const colors = require('./colors.cjs');
const core = require('@unocss/core');
const variants$1 = require('./variants.cjs');

const regexCache = {};
const calcMaxWidthBySize = (size) => {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
  const unit = size.slice(value.length);
  const maxWidth = parseFloat(value) - 0.1;
  return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
};
const variantBreakpoints = {
  name: "breakpoints",
  match(matcher, context) {
    const variantEntries = Object.entries(colors.resolveBreakpoints(context) ?? {}).map(([point, size], idx) => [point, size, idx]);
    for (const [point, size, idx] of variantEntries) {
      if (!regexCache[point])
        regexCache[point] = new RegExp(`^((?:[al]t-)?${point}[:-])`);
      const match = matcher.match(regexCache[point]);
      if (!match)
        continue;
      const [, pre] = match;
      const m = matcher.slice(pre.length);
      if (m === "container")
        continue;
      const isLtPrefix = pre.startsWith("lt-");
      const isAtPrefix = pre.startsWith("at-");
      let order = 1e3;
      if (isLtPrefix) {
        order -= idx + 1;
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (max-width: ${calcMaxWidthBySize(size)})`,
            parentOrder: order
          })
        };
      }
      order += idx + 1;
      if (isAtPrefix && idx < variantEntries.length - 1) {
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
            parentOrder: order
          })
        };
      }
      return {
        matcher: m,
        handle: (input, next) => next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size})`,
          parentOrder: order
        })
      };
    }
  },
  multiPass: true,
  autocomplete: "(at-|lt-|)$breakpoints:"
};

const scopeMatcher = (strict, name, template) => {
  const re = strict ? new RegExp(`^${name}(?:-\\[(.+?)\\])[:-]`) : new RegExp(`^${name}(?:-\\[(.+?)\\])?[:-]`);
  return {
    name: `combinator:${name}`,
    match: (matcher) => {
      const match = matcher.match(re);
      if (match) {
        return {
          matcher: matcher.slice(match[0].length),
          selector: (s) => template.replace("&&-s", s).replace("&&-c", match[1] ?? "*")
        };
      }
    },
    multiPass: true
  };
};
const variantCombinators = [
  scopeMatcher(false, "all", "&&-s &&-c"),
  scopeMatcher(false, "children", "&&-s>&&-c"),
  scopeMatcher(false, "next", "&&-s+&&-c"),
  scopeMatcher(false, "sibling", "&&-s+&&-c"),
  scopeMatcher(false, "siblings", "&&-s~&&-c"),
  scopeMatcher(true, "group", "&&-c &&-s"),
  scopeMatcher(true, "parent", "&&-c>&&-s"),
  scopeMatcher(true, "previous", "&&-c+&&-s"),
  scopeMatcher(true, "peer", "&&-c~&&-s")
];

const variantPrint = variants$1.variantParentMatcher("print", "@media print");
const variantCustomMedia = {
  name: "media",
  match(matcher, { theme }) {
    const match = matcher.match(/^media-([_\d\w]+)[:-]/);
    if (match) {
      const media = theme.media?.[match[1]] ?? `(--${match[1]})`;
      return {
        matcher: matcher.slice(match[0].length),
        handle: (input, next) => next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ""}@media ${media}`
        })
      };
    }
  },
  multiPass: true
};

const variantColorsMediaOrClass = (options = {}) => {
  if (options?.dark === "class" || typeof options.dark === "object") {
    const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
    return [
      variants$1.variantMatcher("dark", (input) => ({ prefix: `${dark} $$ ${input.prefix}` })),
      variants$1.variantMatcher("light", (input) => ({ prefix: `${light} $$ ${input.prefix}` }))
    ];
  }
  return [
    variants$1.variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"),
    variants$1.variantParentMatcher("light", "@media (prefers-color-scheme: light)")
  ];
};

const variantLanguageDirections = [
  variants$1.variantMatcher("rtl", (input) => ({ prefix: `[dir="rtl"] $$ ${input.prefix}` })),
  variants$1.variantMatcher("ltr", (input) => ({ prefix: `[dir="ltr"] $$ ${input.prefix}` }))
];

const variantSelector = {
  name: "selector",
  match(matcher) {
    const match = matcher.match(/^selector-\[(.+?)\][:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: () => match[1]
      };
    }
  }
};
const variantCssLayer = {
  name: "layer",
  match(matcher) {
    const match = matcher.match(/^layer-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        handle: (input, next) => next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ""}@layer ${match[1]}`
        })
      };
    }
  }
};
const variantInternalLayer = {
  name: "uno-layer",
  match(matcher) {
    const match = matcher.match(/^uno-layer-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        layer: match[1]
      };
    }
  }
};
const variantScope = {
  name: "scope",
  match(matcher) {
    const match = matcher.match(/^scope-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: (s) => `.${match[1]} $$ ${s}`
      };
    }
  }
};
const variantVariables = {
  name: "variables",
  match(matcher) {
    if (!matcher.startsWith("["))
      return;
    const [match, rest] = colors.getComponent(matcher, "[", "]", ":") ?? [];
    if (!(match && rest && rest !== ""))
      return;
    const variant = colors.handler.bracket(match) ?? "";
    if (!(variant.startsWith("@") || variant.includes("&")))
      return;
    return {
      matcher: rest,
      handle(input, next) {
        const updates = variant.startsWith("@") ? {
          parent: `${input.parent ? `${input.parent} $$ ` : ""}${variant}`
        } : {
          selector: variant.replace(/&/g, input.selector)
        };
        return next({
          ...input,
          ...updates
        });
      }
    };
  },
  multiPass: true
};

const numberRE = /[0-9.]+(?:[a-z]+|%)?/;
const ignoreProps = [
  /opacity|color|flex/
];
const variantNegative = {
  name: "negative",
  match(matcher) {
    if (!matcher.startsWith("-"))
      return;
    return {
      matcher: matcher.slice(1),
      body: (body) => {
        if (body.find((v) => v[0] === colors.CONTROL_MINI_NO_NEGATIVE))
          return;
        let changed = false;
        body.forEach((v) => {
          const value = v[1]?.toString();
          if (!value || value === "0")
            return;
          if (ignoreProps.some((i) => v[0].match(i)))
            return;
          if (numberRE.test(value)) {
            v[1] = value.replace(numberRE, (i) => `-${i}`);
            changed = true;
          }
        });
        if (changed)
          return body;
        return [];
      }
    };
  }
};

const variantImportant = {
  name: "important",
  match(matcher) {
    let base;
    const match = matcher.match(/^(important[:-]|!)/);
    if (match)
      base = matcher.slice(match[0].length);
    else if (matcher.endsWith("!"))
      base = matcher.slice(0, -1);
    if (base) {
      return {
        matcher: base,
        body: (body) => {
          body.forEach((v) => {
            if (v[1])
              v[1] += " !important";
          });
          return body;
        }
      };
    }
  }
};

const PseudoClasses = Object.fromEntries([
  ["first-letter", "::first-letter"],
  ["first-line", "::first-line"],
  "any-link",
  "link",
  "visited",
  "target",
  ["open", "[open]"],
  "hover",
  "active",
  "focus-visible",
  "focus-within",
  "focus",
  "autofill",
  "enabled",
  "disabled",
  "read-only",
  "read-write",
  "placeholder-shown",
  "default",
  "checked",
  "indeterminate",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "required",
  "optional",
  "root",
  "empty",
  ["even-of-type", ":nth-of-type(even)"],
  ["even", ":nth-child(even)"],
  ["odd-of-type", ":nth-of-type(odd)"],
  ["odd", ":nth-child(odd)"],
  "first-of-type",
  ["first", ":first-child"],
  "last-of-type",
  ["last", ":last-child"],
  "only-child",
  "only-of-type",
  ["placeholder", "::placeholder"],
  ["before", "::before"],
  ["after", "::after"],
  ["selection", "::selection"],
  ["marker", "::marker"],
  ["file", "::file-selector-button"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
const PseudoClassesColon = Object.fromEntries([
  ["backdrop", "::backdrop"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
const PseudoClassFunctions = [
  "not",
  "is",
  "where",
  "has"
];
const PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).join("|");
const PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).join("|");
const PseudoClassFunctionsStr = PseudoClassFunctions.join("|");
const sortValue = (pseudo) => {
  if (pseudo === "active")
    return 1;
};
const taggedPseudoClassMatcher = (tag, parent, combinator) => {
  const rawRe = new RegExp(`^(${core.escapeRegExp(parent)}:)(\\S+)${core.escapeRegExp(combinator)}\\1`);
  const pseudoRE = new RegExp(`^${tag}-((?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))[:-]`);
  const pseudoColonRE = new RegExp(`^${tag}-((?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))[:]`);
  return {
    name: `pseudo:${tag}`,
    match(input) {
      const match = input.match(pseudoRE) || input.match(pseudoColonRE);
      if (match) {
        let pseudo = PseudoClasses[match[3]] || PseudoClassesColon[match[3]] || `:${match[3]}`;
        if (match[2])
          pseudo = `:${match[2]}(${pseudo})`;
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            prefix: `${parent}${pseudo}${combinator}${input2.prefix}`.replace(rawRe, "$1$2:"),
            sort: sortValue(match[3])
          })
        };
      }
    },
    multiPass: true
  };
};
const PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).join("|");
const PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).join("|");
const PseudoClassesAndElementsRE = new RegExp(`^(${PseudoClassesAndElementsStr})[:-]`);
const PseudoClassesAndElementsColonRE = new RegExp(`^(${PseudoClassesAndElementsColonStr})[:]`);
const variantPseudoClassesAndElements = {
  name: "pseudo",
  match: (input) => {
    const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE);
    if (match) {
      const pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`;
      return {
        matcher: input.slice(match[0].length),
        handle: (input2, next) => {
          const selectors = pseudo.startsWith("::") ? {
            pseudo: `${input2.pseudo}${pseudo}`
          } : {
            selector: `${input2.selector}${pseudo}`
          };
          return next({
            ...input2,
            ...selectors,
            sort: sortValue(match[1])
          });
        }
      };
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassesAndElementsStr}):`
};
const PseudoClassFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})[:-]`);
const PseudoClassColonFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})[:]`);
const variantPseudoClassFunctions = {
  match: (input) => {
    const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE);
    if (match) {
      const fn = match[1];
      const pseudo = PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`;
      return {
        matcher: input.slice(match[0].length),
        selector: (s) => `${s}:${fn}(${pseudo})`
      };
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`
};
const variantTaggedPseudoClasses = (options = {}) => {
  const attributify = !!options?.attributifyPseudo;
  return [
    taggedPseudoClassMatcher("group", attributify ? '[group=""]' : ".group", " "),
    taggedPseudoClassMatcher("peer", attributify ? '[peer=""]' : ".peer", "~"),
    taggedPseudoClassMatcher("parent", attributify ? '[parent=""]' : ".parent", ">"),
    taggedPseudoClassMatcher("previous", attributify ? '[previous=""]' : ".previous", "+")
  ];
};
const PartClassesRE = /(part-\[(.+)]:)(.+)/;
const partClasses = {
  match: (input) => {
    const match = input.match(PartClassesRE);
    if (match) {
      const part = `part(${match[2]})`;
      return {
        matcher: input.slice(match[1].length),
        selector: (s) => `${s}::${part}`
      };
    }
  },
  multiPass: true
};

const variants = (options) => [
  variantVariables,
  variantCssLayer,
  variantSelector,
  variantInternalLayer,
  variantNegative,
  variantImportant,
  variantPrint,
  variantCustomMedia,
  variantBreakpoints,
  ...variantCombinators,
  variantPseudoClassesAndElements,
  variantPseudoClassFunctions,
  ...variantTaggedPseudoClasses(options),
  partClasses,
  ...variantColorsMediaOrClass(options),
  ...variantLanguageDirections,
  variantScope
];

exports.partClasses = partClasses;
exports.variantBreakpoints = variantBreakpoints;
exports.variantColorsMediaOrClass = variantColorsMediaOrClass;
exports.variantCombinators = variantCombinators;
exports.variantCssLayer = variantCssLayer;
exports.variantCustomMedia = variantCustomMedia;
exports.variantImportant = variantImportant;
exports.variantInternalLayer = variantInternalLayer;
exports.variantLanguageDirections = variantLanguageDirections;
exports.variantNegative = variantNegative;
exports.variantPrint = variantPrint;
exports.variantPseudoClassFunctions = variantPseudoClassFunctions;
exports.variantPseudoClassesAndElements = variantPseudoClassesAndElements;
exports.variantScope = variantScope;
exports.variantSelector = variantSelector;
exports.variantTaggedPseudoClasses = variantTaggedPseudoClasses;
exports.variantVariables = variantVariables;
exports.variants = variants;
