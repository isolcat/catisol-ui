import { iconDefaults } from '../icon/index.mjs';

const propsToCopy = Object.keys(iconDefaults).concat([
  "provider"
]);
function getIcons(data, icons, not_found) {
  const result = {
    prefix: data.prefix,
    icons: /* @__PURE__ */ Object.create(null)
  };
  const tested = /* @__PURE__ */ new Set();
  let empty = true;
  function copy(name, iteration) {
    if (iteration > 5 || tested.has(name)) {
      return true;
    }
    tested.add(name);
    if (data.icons[name] !== void 0) {
      empty = false;
      result.icons[name] = { ...data.icons[name] };
      return true;
    }
    const aliases = data.aliases;
    if (aliases && aliases[name] !== void 0) {
      const copied = copy(aliases[name].parent, iteration + 1);
      if (copied) {
        if (result.aliases === void 0) {
          result.aliases = /* @__PURE__ */ Object.create(null);
        }
        result.aliases[name] = { ...aliases[name] };
      }
      return copied;
    }
    const chars = data.chars;
    if (chars && chars[name] !== void 0) {
      const parent = chars[name];
      const copied = copy(parent, iteration + 1);
      if (copied) {
        if (result.aliases === void 0) {
          result.aliases = /* @__PURE__ */ Object.create(null);
        }
        result.aliases[name] = {
          parent
        };
      }
      return copied;
    }
    return false;
  }
  propsToCopy.forEach((attr) => {
    if (data[attr] !== void 0) {
      result[attr] = data[attr];
    }
  });
  icons.forEach((name) => {
    if (!copy(name, 0) && not_found === true) {
      if (result.not_found === void 0) {
        result.not_found = [];
      }
      result.not_found.push(name);
    }
  });
  return empty && not_found !== true ? null : result;
}

export { getIcons, propsToCopy };
