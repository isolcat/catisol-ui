'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const loader_custom = require('./custom.cjs');
const loader_modern = require('./modern.cjs');
require('debug');
require('./utils.cjs');
require('../svg/trim.cjs');
require('../svg/build.cjs');
require('../svg/size.cjs');
require('../icon-set/get-icon.cjs');
require('../icon/index.cjs');
require('../icon/merge.cjs');
require('../customisations/index.cjs');

const loadIcon = async (collection, icon, options) => {
  const custom = options?.customCollections?.[collection];
  if (custom) {
    if (typeof custom === "function") {
      const result = await custom(icon);
      if (result) {
        if (typeof result === "string") {
          return await loader_custom.getCustomIcon(() => result, collection, icon, options);
        }
        if ("icons" in result) {
          const ids = [
            icon,
            icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            icon.replace(/([a-z])(\d+)/g, "$1-$2")
          ];
          return await loader_modern.searchForIcon(result, collection, ids, options);
        }
      }
    } else {
      return await loader_custom.getCustomIcon(custom, collection, icon, options);
    }
  }
  return void 0;
};

exports.loadIcon = loadIcon;
