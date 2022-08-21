'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@unocss/core');
const cssTree = require('css-tree');

function transformerDirectives(options = {}) {
  return {
    name: "css-directive",
    enforce: options?.enforce,
    idFilter: (id) => !!id.match(core.cssIdRE),
    transform: (code, id, ctx) => {
      return transformDirectives(code, ctx.uno, options, id);
    }
  };
}
const themeFnRE = /theme\((.*?)\)/g;
async function transformDirectives(code, uno, options, filename, originalCode, offset) {
  const {
    varStyle = "--at-",
    throwOnMissing = true
  } = options;
  const isApply = code.original.includes("@apply") || varStyle !== false && code.original.includes(varStyle);
  const hasThemeFn = code.original.match(themeFnRE);
  if (!isApply && !hasThemeFn)
    return;
  const ast = cssTree.parse(originalCode || code.original, {
    parseAtrulePrelude: false,
    positions: true,
    filename
  });
  if (ast.type !== "StyleSheet")
    return;
  const calcOffset = (pos) => offset ? pos + offset : pos;
  const handleApply = async (node, childNode) => {
    let body;
    if (childNode.type === "Atrule" && childNode.name === "apply" && childNode.prelude && childNode.prelude.type === "Raw") {
      body = childNode.prelude.value.trim();
    } else if (varStyle !== false && childNode.type === "Declaration" && childNode.property === `${varStyle}apply` && childNode.value.type === "Raw") {
      body = childNode.value.value.trim();
      if (body.match(/^(['"]).*\1$/))
        body = body.slice(1, -1);
    }
    if (!body)
      return;
    const classNames = core.expandVariantGroup(body).split(/\s+/g).map((className) => className.trim().replace(/\\/, ""));
    const utils = (await Promise.all(
      classNames.map((i) => uno.parseToken(i, "-"))
    )).filter(core.notNull).flat().sort((a, b) => a[0] - b[0]).sort((a, b) => (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) - (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0)).reduce((acc, item) => {
      const target = acc.find((i) => i[1] === item[1] && i[3] === item[3]);
      if (target)
        target[2] += item[2];
      else
        acc.push([...item]);
      return acc;
    }, []);
    if (!utils.length)
      return;
    for (const i of utils) {
      const [, _selector, body2, parent] = i;
      const selector = _selector?.replace(core.regexScopePlaceholder, " ") || _selector;
      if (parent || selector && selector !== ".\\-") {
        let newSelector = cssTree.generate(node.prelude);
        if (selector && selector !== ".\\-") {
          const selectorAST = cssTree.parse(selector, {
            context: "selector"
          });
          const prelude = cssTree.clone(node.prelude);
          prelude.children.forEach((child) => {
            const parentSelectorAst = cssTree.clone(selectorAST);
            parentSelectorAst.children.forEach((i2) => {
              if (i2.type === "ClassSelector" && i2.name === "\\-")
                Object.assign(i2, cssTree.clone(child));
            });
            Object.assign(child, parentSelectorAst);
          });
          newSelector = cssTree.generate(prelude);
        }
        let css = `${newSelector}{${body2}}`;
        if (parent)
          css = `${parent}{${css}}`;
        code.appendLeft(calcOffset(node.loc.end.offset), css);
      } else {
        code.appendRight(calcOffset(childNode.loc.end.offset), body2);
      }
    }
    code.remove(
      calcOffset(childNode.loc.start.offset),
      calcOffset(childNode.loc.end.offset)
    );
  };
  const handleThemeFn = (node) => {
    const value = node.value;
    const offset2 = value.loc.start.offset;
    const str = code.original.slice(offset2, value.loc.end.offset);
    const matches = Array.from(str.matchAll(themeFnRE));
    if (!matches.length)
      return;
    for (const match of matches) {
      const rawArg = match[1].trim();
      if (!rawArg)
        throw new Error("theme() expect exact one argument, but got 0");
      let value2 = uno.config.theme;
      const keys = rawArg.slice(1, -1).split(".");
      keys.every((key) => {
        if (value2[key] != null)
          value2 = value2[key];
        else if (value2[+key] != null)
          value2 = value2[+key];
        else
          return false;
        return true;
      });
      if (typeof value2 === "string") {
        code.overwrite(
          offset2 + match.index,
          offset2 + match.index + match[0].length,
          value2
        );
      } else if (throwOnMissing) {
        throw new Error(`theme of "${rawArg.slice(1, -1)}" did not found`);
      }
    }
  };
  const stack = [];
  const processNode = async (node, _item, _list) => {
    if (hasThemeFn && node.type === "Declaration")
      handleThemeFn(node);
    if (isApply && node.type === "Rule") {
      await Promise.all(
        node.block.children.map(async (childNode, _childItem) => {
          if (childNode.type === "Raw")
            return transformDirectives(code, uno, options, filename, childNode.value, calcOffset(childNode.loc.start.offset));
          await handleApply(node, childNode);
        }).toArray()
      );
    }
  };
  cssTree.walk(ast, (...args) => stack.push(processNode(...args)));
  await Promise.all(stack);
}

exports["default"] = transformerDirectives;
exports.transformDirectives = transformDirectives;
