'use strict';

const ohmyfetch = require('ohmyfetch');

const defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: "center",
  vAlign: "middle",
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0
});

const allKeys = Object.keys(defaults);
allKeys.filter((key) => key !== "width" && key !== "height");

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

function mergeIconData(icon, alias) {
  const result = { ...icon };
  for (const key in iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}

function getIconData(data, name, full = false) {
  function getIcon(name2, iteration) {
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    const aliases = data.aliases;
    if (aliases && aliases[name2] !== void 0) {
      const item = aliases[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    const chars = data.chars;
    if (!iteration && chars && chars[name2] !== void 0) {
      return getIcon(chars[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}

for (const prop in iconDefaults) {
  typeof iconDefaults[prop];
}

Object.keys(iconDefaults).concat([
  "provider"
]);

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width.toString() + "";
  height = typeof height === "string" ? height : height.toString() + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + box.width.toString() + " " + box.height.toString()
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}

"IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);

function trimSVG(str) {
  return str.replace(/(["';{}><])\s*\n\s*/g, "$1").replace(/\s*\n\s*/g, " ").replace(/\s+"/g, '"').replace(/="\s+/g, '="').trim();
}

function add(keyword, colors) {
  const type = "rgb";
  const r = colors[0];
  const length = colors.length;
  ({
    type,
    r,
    g: length > 1 ? colors[1] : r,
    b: length > 2 ? colors[2] : r,
    alpha: length > 3 ? colors[3] : 1
  });
}
add("silver", [192]);
add("gray", [128]);
add("white", [255]);
add("maroon", [128, 0, 0]);
add("red", [255, 0, 0]);
add("purple", [128, 0]);
add("fuchsia", [255, 0]);
add("green", [0, 128]);
add("lime", [0, 255]);
add("olive", [128, 128, 0]);
add("yellow", [255, 255, 0]);
add("navy", [0, 0, 128]);
add("blue", [0, 0, 255]);
add("teal", [0, 128, 128]);
add("aqua", [0, 255, 255]);
add("aliceblue", [240, 248, 255]);
add("antiquewhite", [250, 235, 215]);
add("aqua", [0, 255, 255]);
add("aquamarine", [127, 255, 212]);
add("azure", [240, 255, 255]);
add("beige", [245, 245, 220]);
add("bisque", [255, 228, 196]);
add("black", [0]);
add("blanchedalmond", [255, 235, 205]);
add("blue", [0, 0, 255]);
add("blueviolet", [138, 43, 226]);
add("brown", [165, 42, 42]);
add("burlywood", [222, 184, 135]);
add("cadetblue", [95, 158, 160]);
add("chartreuse", [127, 255, 0]);
add("chocolate", [210, 105, 30]);
add("coral", [255, 127, 80]);
add("cornflowerblue", [100, 149, 237]);
add("cornsilk", [255, 248, 220]);
add("crimson", [220, 20, 60]);
add("cyan", [0, 255, 255]);
add("darkblue", [0, 0, 139]);
add("darkcyan", [0, 139, 139]);
add("darkgoldenrod", [184, 134, 11]);
add("darkgray", [169]);
add("darkgreen", [0, 100]);
add("darkgrey", [169]);
add("darkkhaki", [189, 183, 107]);
add("darkmagenta", [139, 0]);
add("darkolivegreen", [85, 107, 47]);
add("darkorange", [255, 140, 0]);
add("darkorchid", [153, 50, 204]);
add("darkred", [139, 0, 0]);
add("darksalmon", [233, 150, 122]);
add("darkseagreen", [143, 188]);
add("darkslateblue", [72, 61, 139]);
add("darkslategray", [47, 79, 79]);
add("darkslategrey", [47, 79, 79]);
add("darkturquoise", [0, 206, 209]);
add("darkviolet", [148, 0, 211]);
add("deeppink", [255, 20, 147]);
add("deepskyblue", [0, 191, 255]);
add("dimgray", [105]);
add("dimgrey", [105]);
add("dodgerblue", [30, 144, 255]);
add("firebrick", [178, 34, 34]);
add("floralwhite", [255, 250, 240]);
add("forestgreen", [34, 139]);
add("fuchsia", [255, 0]);
add("gainsboro", [220]);
add("ghostwhite", [248, 248, 255]);
add("gold", [255, 215, 0]);
add("goldenrod", [218, 165, 32]);
add("gray", [128]);
add("green", [0, 128]);
add("greenyellow", [173, 255, 47]);
add("grey", [128]);
add("honeydew", [240, 255]);
add("hotpink", [255, 105, 180]);
add("indianred", [205, 92, 92]);
add("indigo", [75, 0, 130]);
add("ivory", [255, 255, 240]);
add("khaki", [240, 230, 140]);
add("lavender", [230, 230, 250]);
add("lavenderblush", [255, 240, 245]);
add("lawngreen", [124, 252, 0]);
add("lemonchiffon", [255, 250, 205]);
add("lightblue", [173, 216, 230]);
add("lightcoral", [240, 128, 128]);
add("lightcyan", [224, 255, 255]);
add("lightgoldenrodyellow", [250, 250, 210]);
add("lightgray", [211]);
add("lightgreen", [144, 238]);
add("lightgrey", [211]);
add("lightpink", [255, 182, 193]);
add("lightsalmon", [255, 160, 122]);
add("lightseagreen", [32, 178, 170]);
add("lightskyblue", [135, 206, 250]);
add("lightslategray", [119, 136, 153]);
add("lightslategrey", [119, 136, 153]);
add("lightsteelblue", [176, 196, 222]);
add("lightyellow", [255, 255, 224]);
add("lime", [0, 255]);
add("limegreen", [50, 205]);
add("linen", [250, 240, 230]);
add("magenta", [255, 0]);
add("maroon", [128, 0, 0]);
add("mediumaquamarine", [102, 205, 170]);
add("mediumblue", [0, 0, 205]);
add("mediumorchid", [186, 85, 211]);
add("mediumpurple", [147, 112, 219]);
add("mediumseagreen", [60, 179, 113]);
add("mediumslateblue", [123, 104, 238]);
add("mediumspringgreen", [0, 250, 154]);
add("mediumturquoise", [72, 209, 204]);
add("mediumvioletred", [199, 21, 133]);
add("midnightblue", [25, 25, 112]);
add("mintcream", [245, 255, 250]);
add("mistyrose", [255, 228, 225]);
add("moccasin", [255, 228, 181]);
add("navajowhite", [255, 222, 173]);
add("navy", [0, 0, 128]);
add("oldlace", [253, 245, 230]);
add("olive", [128, 128, 0]);
add("olivedrab", [107, 142, 35]);
add("orange", [255, 165, 0]);
add("orangered", [255, 69, 0]);
add("orchid", [218, 112, 214]);
add("palegoldenrod", [238, 232, 170]);
add("palegreen", [152, 251]);
add("paleturquoise", [175, 238, 238]);
add("palevioletred", [219, 112, 147]);
add("papayawhip", [255, 239, 213]);
add("peachpuff", [255, 218, 185]);
add("peru", [205, 133, 63]);
add("pink", [255, 192, 203]);
add("plum", [221, 160]);
add("powderblue", [176, 224, 230]);
add("purple", [128, 0]);
add("rebeccapurple", [102, 51, 153]);
add("red", [255, 0, 0]);
add("rosybrown", [188, 143, 143]);
add("royalblue", [65, 105, 225]);
add("saddlebrown", [139, 69, 19]);
add("salmon", [250, 128, 114]);
add("sandybrown", [244, 164, 96]);
add("seagreen", [46, 139, 87]);
add("seashell", [255, 245, 238]);
add("sienna", [160, 82, 45]);
add("silver", [192]);
add("skyblue", [135, 206, 235]);
add("slateblue", [106, 90, 205]);
add("slategray", [112, 128, 144]);
add("slategrey", [112, 128, 144]);
add("snow", [255, 250, 250]);
add("springgreen", [0, 255, 127]);
add("steelblue", [70, 130, 180]);
add("tan", [210, 180, 140]);
add("teal", [0, 128, 128]);
add("thistle", [216, 191]);
add("tomato", [255, 99, 71]);
add("turquoise", [64, 224, 208]);
add("violet", [238, 130]);
add("wheat", [245, 222, 179]);
add("white", [255]);
add("whitesmoke", [245]);
add("yellow", [255, 255, 0]);
add("yellowgreen", [154, 205, 50]);

const svgWidthRegex = /width\s*=\s*["'](\w+)["']/;
const svgHeightRegex = /height\s*=\s*["'](\w+)["']/;
function configureSvgSize(svg, props, scale) {
  const svgNode = svg.slice(0, svg.indexOf(">"));
  let result = svgWidthRegex.exec(svgNode);
  const w = result != null;
  if (typeof props.width === "undefined" || props.width === null) {
    if (typeof scale === "number") {
      props.width = `${scale}em`;
    } else if (result) {
      props.width = result[1];
    }
  }
  result = svgHeightRegex.exec(svgNode);
  const h = result != null;
  if (typeof props.height === "undefined" || props.height === null) {
    if (typeof scale === "number") {
      props.height = `${scale}em`;
    } else if (result) {
      props.height = result[1];
    }
  }
  return [w, h];
}
async function mergeIconProps(svg, collection, icon, options, propsProvider, afterCustomizations) {
  const { scale, addXmlNs = false } = options ?? {};
  const { additionalProps = {}, iconCustomizer } = options?.customizations ?? {};
  const props = await propsProvider?.() ?? {};
  await iconCustomizer?.(collection, icon, props);
  Object.keys(additionalProps).forEach((p) => {
    const v = additionalProps[p];
    if (v !== void 0 && v !== null)
      props[p] = v;
  });
  afterCustomizations?.(props);
  const [widthOnSvg, heightOnSvg] = configureSvgSize(svg, props, scale);
  if (addXmlNs) {
    if (!svg.includes(" xmlns=") && !props["xmlns"]) {
      props["xmlns"] = "http://www.w3.org/2000/svg";
    }
    if (!svg.includes(" xmlns:xlink=") && svg.includes("xlink:") && !props["xmlns:xlink"]) {
      props["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
    }
  }
  const propsToAdd = Object.keys(props).map((p) => p === "width" && widthOnSvg || p === "height" && heightOnSvg ? null : `${p}="${props[p]}"`).filter((p) => p != null);
  if (propsToAdd.length) {
    svg = svg.replace("<svg ", `<svg ${propsToAdd.join(" ")} `);
  }
  if (options) {
    const { defaultStyle, defaultClass } = options;
    if (defaultClass && !svg.includes(" class=")) {
      svg = svg.replace("<svg ", `<svg class="${defaultClass}" `);
    }
    if (defaultStyle && !svg.includes(" style=")) {
      svg = svg.replace("<svg ", `<svg style="${defaultStyle}" `);
    }
  }
  const usedProps = options?.usedProps;
  if (usedProps) {
    Object.keys(additionalProps).forEach((p) => {
      const v = props[p];
      if (v !== void 0 && v !== null)
        usedProps[p] = v;
    });
    if (typeof props.width !== "undefined" && props.width !== null) {
      usedProps.width = props.width;
    }
    if (typeof props.height !== "undefined" && props.height !== null) {
      usedProps.height = props.height;
    }
  }
  return svg;
}

async function getCustomIcon(custom, collection, icon, options) {
  let result;
  if (typeof custom === "function") {
    result = await custom(icon);
  } else {
    const inline = custom[icon];
    result = typeof inline === "function" ? await inline() : inline;
  }
  if (result) {
    const cleanupIdx = result.indexOf("<svg");
    if (cleanupIdx > 0)
      result = result.slice(cleanupIdx);
    const { transform } = options?.customizations ?? {};
    result = typeof transform === "function" ? await transform(result, collection, icon) : result;
    if (!result.startsWith("<svg")) {
      console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`);
      return result;
    }
    return await mergeIconProps(options?.customizations?.trimCustomSvg === true ? trimSVG(result) : result, collection, icon, options, void 0);
  }
}

async function searchForIcon(iconSet, collection, ids, options) {
  let iconData;
  const { customize } = options?.customizations ?? {};
  for (const id of ids) {
    iconData = getIconData(iconSet, id, true);
    if (iconData) {
      let defaultCustomizations = { ...defaults };
      if (typeof customize === "function")
        defaultCustomizations = customize(defaultCustomizations);
      const {
        attributes: { width, height, ...restAttributes },
        body
      } = iconToSVG(iconData, defaultCustomizations);
      const scale = options?.scale;
      return await mergeIconProps(`<svg >${body}</svg>`, collection, id, options, () => {
        return { ...restAttributes };
      }, (props) => {
        if (typeof props.width === "undefined" || props.width === null) {
          if (typeof scale === "number") {
            props.width = `${scale}em`;
          } else {
            props.width = width;
          }
        }
        if (typeof props.height === "undefined" || props.height === null) {
          if (typeof scale === "number") {
            props.height = `${scale}em`;
          } else {
            props.height = height;
          }
        }
      });
    }
  }
}

const loadIcon = async (collection, icon, options) => {
  const custom = options?.customCollections?.[collection];
  if (custom) {
    if (typeof custom === "function") {
      const result = await custom(icon);
      if (result) {
        if (typeof result === "string") {
          return await getCustomIcon(() => result, collection, icon, options);
        }
        if ("icons" in result) {
          const ids = [
            icon,
            icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            icon.replace(/([a-z])(\d+)/g, "$1-$2")
          ];
          return await searchForIcon(result, collection, ids, options);
        }
      }
    } else {
      return await getCustomIcon(custom, collection, icon, options);
    }
  }
  return void 0;
};

const supportedCollection = ["material-symbols", "ic", "mdi", "ph", "ri", "carbon", "bi", "tabler", "ion", "uil", "teenyicons", "clarity", "iconoir", "majesticons", "zondicons", "ant-design", "bx", "bxs", "gg", "cil", "lucide", "pixelarticons", "system-uicons", "ci", "akar-icons", "typcn", "radix-icons", "ep", "mdi-light", "fe", "eos-icons", "line-md", "charm", "prime", "heroicons-outline", "heroicons-solid", "uiw", "uim", "uit", "uis", "maki", "gridicons", "mi", "quill", "gala", "fluent", "icon-park-outline", "icon-park", "vscode-icons", "jam", "codicon", "pepicons", "bytesize", "ei", "fa6-solid", "fa6-regular", "octicon", "ooui", "nimbus", "openmoji", "twemoji", "noto", "noto-v1", "emojione", "emojione-monotone", "emojione-v1", "fxemoji", "bxl", "logos", "simple-icons", "cib", "fa6-brands", "arcticons", "file-icons", "brandico", "entypo-social", "cryptocurrency", "flag", "circle-flags", "flagpack", "cif", "gis", "map", "geo", "fad", "academicons", "wi", "healthicons", "medical-icon", "la", "eva", "dashicons", "flat-color-icons", "entypo", "foundation", "raphael", "icons8", "iwwa", "fa-solid", "fa-regular", "fa-brands", "fa", "fontisto", "icomoon-free", "ps", "subway", "oi", "wpf", "simple-line-icons", "et", "el", "vaadin", "grommet-icons", "whh", "si-glyph", "zmdi", "ls", "bpmn", "flat-ui", "vs", "topcoat", "il", "websymbol", "fontelico", "feather", "mono-icons"];
function createCDNLoader(cdnBase) {
  const cache = /* @__PURE__ */ new Map();
  function fetchCollection(name) {
    if (!supportedCollection.includes(name))
      return void 0;
    if (!cache.has(name))
      cache.set(name, ohmyfetch.$fetch(`${cdnBase}@iconify-json/${name}/icons.json`));
    return cache.get(name);
  }
  return async (collection, icon, options) => {
    let result = await loadIcon(collection, icon, options);
    if (result)
      return result;
    const iconSet = await fetchCollection(collection);
    if (iconSet) {
      const ids = [
        icon,
        icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
        icon.replace(/([a-z])(\d+)/g, "$1-$2")
      ];
      result = await searchForIcon(iconSet, collection, ids, options);
    }
    return result;
  };
}

exports.createCDNLoader = createCDNLoader;
exports.loadIcon = loadIcon;
