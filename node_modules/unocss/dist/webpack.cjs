'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const WebpackPlugin = require('@unocss/webpack');
const presetUno = require('@unocss/preset-uno');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const WebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(WebpackPlugin);
const presetUno__default = /*#__PURE__*/_interopDefaultLegacy(presetUno);

function UnocssWebpackPlugin(configOrPath) {
  return WebpackPlugin__default(
    configOrPath,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

exports["default"] = UnocssWebpackPlugin;
for (const k in WebpackPlugin) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = WebpackPlugin[k];
}
