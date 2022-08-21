'use strict';

const core = require('@unocss/core');

const variantMatcher = (name, handler) => {
  const re = new RegExp(`^${core.escapeRegExp(name)}[:-]`);
  return {
    name,
    match: (input) => {
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            ...handler(input2)
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
};
const variantParentMatcher = (name, parent) => {
  const re = new RegExp(`^${core.escapeRegExp(name)}[:-]`);
  return {
    name,
    match: (input) => {
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            parent: `${input2.parent ? `${input2.parent} $$ ` : ""}${parent}`
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
};

exports.variantMatcher = variantMatcher;
exports.variantParentMatcher = variantParentMatcher;
