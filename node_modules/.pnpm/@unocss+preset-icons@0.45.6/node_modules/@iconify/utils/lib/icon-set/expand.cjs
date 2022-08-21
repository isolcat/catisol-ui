'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const icon_index = require('../icon/index.cjs');

function expandIconSet(data) {
  const icons = Object.keys(data.icons);
  Object.keys(icon_index.iconDefaults).forEach((prop) => {
    if (typeof data[prop] !== typeof icon_index.iconDefaults[prop]) {
      return;
    }
    const value = data[prop];
    icons.forEach((name) => {
      const item = data.icons[name];
      if (item[prop] === void 0) {
        item[prop] = value;
      }
    });
    delete data[prop];
  });
}

exports.expandIconSet = expandIconSet;
