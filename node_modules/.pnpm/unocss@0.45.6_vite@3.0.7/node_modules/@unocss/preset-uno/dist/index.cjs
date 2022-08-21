'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetWind = require('@unocss/preset-wind');
const presetMini = require('@unocss/preset-mini');
const utils = require('@unocss/preset-mini/utils');

const mixComponent = (v1, v2, w) => `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`;
const mixColor = (color1, color2, weight) => {
  const colors = [color1, color2];
  const cssColors = [];
  for (let c = 0; c < 2; ++c) {
    const color = typeof colors[c] === "string" ? utils.parseCssColor(colors[c]) : colors[c];
    if (!color || !["rgb", "rgba"].includes(color.type))
      return;
    cssColors.push(color);
  }
  const newComponents = [];
  for (let x = 0; x < 3; ++x)
    newComponents.push(mixComponent(cssColors[0].components[x], cssColors[1].components[x], weight));
  return {
    type: "rgb",
    components: newComponents,
    alpha: mixComponent(cssColors[0].alpha ?? 1, cssColors[1].alpha ?? 1, weight)
  };
};
const tint = (color, weight) => mixColor("#fff", color, weight);
const shade = (color, weight) => mixColor("#000", color, weight);
const shift = (color, weight) => {
  const num = parseFloat(`${weight}`);
  if (!Number.isNaN(num))
    return num > 0 ? shade(color, weight) : tint(color, -num);
};
const fns = { tint, shade, shift };
const variantColorMix = (matcher) => {
  const m = matcher.match(/^mix-(tint|shade|shift)-(-?\d{1,3})[-:]/);
  if (m) {
    return {
      matcher: matcher.slice(m[0].length),
      body: (body) => {
        body.forEach((v) => {
          if (v[1]) {
            const color = utils.parseCssColor(`${v[1]}`);
            if (color) {
              const mixed = fns[m[1]](color, m[2]);
              if (mixed)
                v[1] = utils.colorToString(mixed);
            }
          }
        });
        return body;
      }
    };
  }
};

const presetUno = (options = {}) => {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  return {
    name: "@unocss/preset-uno",
    theme: presetWind.theme,
    rules: presetWind.rules,
    shortcuts: presetWind.shortcuts,
    variants: [
      ...presetWind.variants(options),
      variantColorMix
    ],
    options,
    preflights: presetMini.preflights,
    prefix: options.prefix
  };
};

exports["default"] = presetUno;
exports.presetUno = presetUno;
