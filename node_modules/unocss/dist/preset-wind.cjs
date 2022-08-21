'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetWind = require('@unocss/preset-wind');



for (const k in presetWind) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = presetWind[k];
}
