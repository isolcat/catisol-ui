'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@unocss/core');
const presetUno = require('@unocss/preset-uno');
const presetAttributify = require('@unocss/preset-attributify');
const presetTagify = require('@unocss/preset-tagify');
const presetIcons = require('@unocss/preset-icons');
const presetWebFonts = require('@unocss/preset-web-fonts');
const presetTypography = require('@unocss/preset-typography');
const presetMini = require('@unocss/preset-mini');
const presetWind = require('@unocss/preset-wind');
const transformerDirectives = require('@unocss/transformer-directives');
const transformerVariantGroup = require('@unocss/transformer-variant-group');
const transformerCompileClass = require('@unocss/transformer-compile-class');
const transformerAttributifyJsx = require('@unocss/transformer-attributify-jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const presetUno__default = /*#__PURE__*/_interopDefaultLegacy(presetUno);
const presetAttributify__default = /*#__PURE__*/_interopDefaultLegacy(presetAttributify);
const presetTagify__default = /*#__PURE__*/_interopDefaultLegacy(presetTagify);
const presetIcons__default = /*#__PURE__*/_interopDefaultLegacy(presetIcons);
const presetWebFonts__default = /*#__PURE__*/_interopDefaultLegacy(presetWebFonts);
const presetTypography__default = /*#__PURE__*/_interopDefaultLegacy(presetTypography);
const presetMini__default = /*#__PURE__*/_interopDefaultLegacy(presetMini);
const presetWind__default = /*#__PURE__*/_interopDefaultLegacy(presetWind);
const transformerDirectives__default = /*#__PURE__*/_interopDefaultLegacy(transformerDirectives);
const transformerVariantGroup__default = /*#__PURE__*/_interopDefaultLegacy(transformerVariantGroup);
const transformerCompileClass__default = /*#__PURE__*/_interopDefaultLegacy(transformerCompileClass);
const transformerAttributifyJsx__default = /*#__PURE__*/_interopDefaultLegacy(transformerAttributifyJsx);

function defineConfig(config) {
  return config;
}

exports.presetUno = presetUno__default;
exports.presetAttributify = presetAttributify__default;
exports.presetTagify = presetTagify__default;
exports.presetIcons = presetIcons__default;
exports.presetWebFonts = presetWebFonts__default;
exports.presetTypography = presetTypography__default;
exports.presetMini = presetMini__default;
exports.presetWind = presetWind__default;
exports.transformerDirectives = transformerDirectives__default;
exports.transformerVariantGroup = transformerVariantGroup__default;
exports.transformerCompileClass = transformerCompileClass__default;
exports.transformerAttributifyJsx = transformerAttributifyJsx__default;
exports.defineConfig = defineConfig;
for (const k in core) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = core[k];
}
