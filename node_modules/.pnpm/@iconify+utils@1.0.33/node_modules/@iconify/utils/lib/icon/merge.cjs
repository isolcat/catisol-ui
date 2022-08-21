'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const icon_index = require('./index.cjs');

function mergeIconData(icon, alias) {
  const result = { ...icon };
  for (const key in icon_index.iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}

exports.mergeIconData = mergeIconData;
