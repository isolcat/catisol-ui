'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetMini = require('@unocss/preset-mini');



for (const k in presetMini) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = presetMini[k];
}
