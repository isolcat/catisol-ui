'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false
});
function fullIcon(data) {
  return { ...iconDefaults, ...data };
}

exports.fullIcon = fullIcon;
exports.iconDefaults = iconDefaults;
exports.matchName = matchName;
