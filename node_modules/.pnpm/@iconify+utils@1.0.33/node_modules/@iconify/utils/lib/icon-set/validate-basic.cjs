'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const icon_index = require('../icon/index.cjs');

const optionalProperties = {
  provider: "string",
  aliases: "object",
  not_found: "object"
};
for (const prop in icon_index.iconDefaults) {
  optionalProperties[prop] = typeof icon_index.iconDefaults[prop];
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  for (const prop in optionalProperties) {
    if (obj[prop] !== void 0 && typeof obj[prop] !== optionalProperties[prop]) {
      return null;
    }
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(icon_index.matchName) || typeof icon.body !== "string") {
      return null;
    }
    for (const prop in icon_index.iconDefaults) {
      if (icon[prop] !== void 0 && typeof icon[prop] !== typeof icon_index.iconDefaults[prop]) {
        return null;
      }
    }
  }
  const aliases = data.aliases;
  if (aliases) {
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(icon_index.matchName) || typeof parent !== "string" || !icons[parent] && !aliases[parent]) {
        return null;
      }
      for (const prop in icon_index.iconDefaults) {
        if (icon[prop] !== void 0 && typeof icon[prop] !== typeof icon_index.iconDefaults[prop]) {
          return null;
        }
      }
    }
  }
  return data;
}

exports.quicklyValidateIconSet = quicklyValidateIconSet;
