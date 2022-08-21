import { resolve, dirname } from 'path';
import fs from 'fs';
import { createConfigLoader } from 'unconfig';

async function loadConfig(cwd = process.cwd(), configOrPath = cwd, extraConfigSources = []) {
  let inlineConfig = {};
  if (typeof configOrPath !== "string") {
    inlineConfig = configOrPath;
    if (inlineConfig.configFile === false) {
      return {
        config: inlineConfig,
        sources: []
      };
    } else {
      configOrPath = inlineConfig.configFile || process.cwd();
    }
  }
  const resolved = resolve(configOrPath);
  let isFile = false;
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    isFile = true;
    cwd = dirname(resolved);
  }
  const loader = createConfigLoader({
    sources: isFile ? [
      {
        files: resolved,
        extensions: []
      }
    ] : [
      {
        files: [
          "unocss.config",
          "uno.config"
        ]
      },
      ...extraConfigSources
    ],
    cwd,
    defaults: inlineConfig
  });
  const result = await loader.load();
  result.config = result.config || inlineConfig;
  if (result.config.configDeps) {
    result.sources = [
      ...result.sources,
      ...result.config.configDeps.map((i) => resolve(cwd, i))
    ];
  }
  return result;
}

export { loadConfig };
