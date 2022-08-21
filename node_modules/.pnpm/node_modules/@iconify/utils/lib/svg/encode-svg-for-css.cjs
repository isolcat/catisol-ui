'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function encodeSvgForCss(svg) {
  let useSvg = svg.startsWith("<svg>") ? svg.replace("<svg>", "<svg >") : svg;
  if (!useSvg.includes(" xmlns:xlink=") && useSvg.includes(" xlink:")) {
    useSvg = useSvg.replace("<svg ", '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }
  if (!useSvg.includes(" xmlns=")) {
    useSvg = useSvg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  }
  return useSvg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E");
}

exports.encodeSvgForCss = encodeSvgForCss;
