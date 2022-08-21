import { defaults } from './index.mjs';

const allKeys = Object.keys(defaults);
const filteredKeys = allKeys.filter((key) => key !== "width" && key !== "height");
function compare(item1, item2, compareDimensions = true) {
  const keys = compareDimensions ? allKeys : filteredKeys;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (item1[key] !== item2[key]) {
      return false;
    }
  }
  return true;
}

export { compare };
