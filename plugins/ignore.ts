import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/shared';

const wikiDir = path.resolve(__dirname, '..', 'wiki');
const nodeModulesDir = path.resolve(__dirname, '..', 'node_modules');
const cacheDir = path.resolve(nodeModulesDir, '.wiki-cache');

function getAllMdFiles(dirPath: string): string[] {
  const files = fs.readdirSync(dirPath);

  return files.reduce<string[]>((acc, file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      return acc.concat(getAllMdFiles(fullPath));
    }
    if (path.extname(file) === '.md') {
      return acc.concat(path.relative(wikiDir, fullPath));
    }
    return acc;
  }, []);
}

export function ignorePlugin(): RspressPlugin {
  return {
    name: 'ignore',
    config(config) {
      config.builderConfig ??= {};
      config.builderConfig.source ??= {};
      config.builderConfig.source.alias ??= {};
      // @ts-ignore
      config.builderConfig.source.alias['@wiki'] = cacheDir;
      return config;
    },
    beforeBuild() {
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }
      getAllMdFiles(wikiDir).forEach((file) => {
        const content = fs.readFileSync(path.join(wikiDir, file), 'utf-8').split('\n');
        const newContent = [];
        let ignore = false;
        for (const line of content) {
          if (line.includes('<!--ignore:start-->')) {
            ignore = true;
          }
          if (!ignore) {
            newContent.push(line);
          }
          if (line.includes('<!--ignore:end-->')) {
            ignore = false;
          }
        }
        const outputFilePath = path.join(cacheDir, file);
        const outputDir = path.dirname(outputFilePath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputFilePath, newContent.join('\n'));
      });
    },
  };
}
