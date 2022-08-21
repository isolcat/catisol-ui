'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetTypography = require('@unocss/preset-typography');



for (const k in presetTypography) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = presetTypography[k];
}
