import { cac } from 'cac';
import { b as build, v as version, h as handleError } from './chunks/index.mjs';
import 'fs';
import 'pathe';
import 'fast-glob';
import 'consola';
import 'colorette';
import 'perfect-debounce';
import '@unocss/core';
import '@unocss/config';
import '@unocss/preset-uno';

async function startCli(cwd = process.cwd(), argv = process.argv, options = {}) {
  const cli = cac("unocss");
  cli.command("[...patterns]", "Glob patterns", {
    ignoreOptionDefaultValue: true
  }).option("-o, --out-file <file>", "Output file", {
    default: cwd
  }).option("-c, --config [file]", "Config file").option("-w, --watch", "Watch for file changes").option("--preflights", "Enable preflights", { default: true }).option("-m, --minify", "Minify generated CSS", { default: false }).action(async (patterns, flags) => {
    Object.assign(options, {
      cwd,
      ...flags
    });
    if (patterns)
      options.patterns = patterns;
    await build(options);
  });
  cli.help();
  cli.version(version);
  cli.parse(argv, { run: false });
  await cli.runMatchedCommand();
}

startCli().catch(handleError);
