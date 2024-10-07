// WIP
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ini from 'ini';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitmodulesPath = path.join(__dirname, '..', '.gitmodules');
const gitmodules = ini.parse(fs.readFileSync(gitmodulesPath, 'utf-8'));

const md = fs.readFileSync('./wiki/weather-kit/Home.md', 'utf8');

const sections = md.split('\n\n').map((section) => {
  const content = section.trim();

  // 警告处理
  if (content.startsWith('> ⚠️')) {
    // 多行
    if (content.includes('\n')) {
      const [title, ...rest] = content.split('\n');
      let result = `:::warning{title=${title.replace('> ⚠️', '').trim()}}\n`;
      rest.forEach((line) => {
        result += line.replace(/^> /, '').trim().replace(/^\*/, '-');
        result += '\n';
      });
      result += '\n:::';
      return result;
    }
    return `:::info\n${content.replace('> ⚠️', '').trim()}\n:::`;
  }

  // 安装链接
  if (content.startsWith('## 安装链接')) {
    const urls = {};
    content.split('\n').forEach((line, index, array) => {
      if (line.startsWith('  * ')) {
        const app = line
          .replace('  * ', '')
          .trim()
          .replace(/(：|:)$/, '')
          .toLowerCase();
        const [, file] = /\[(.*?)\]/.exec(array[index + 2]);
        switch (app) {
          case 'loon':
            urls.loon = file;
            break;
          case 'surge':
            urls.surge = file;
            break;
          case 'quantumult x':
            urls.qx = file;
            break;
          case 'stash':
            urls.stash = file;
            break;
          case 'egern':
            urls.egern = file;
            break;
          case 'shadowrocket':
            urls.shadowrocket = file;
            break;
          default:
            break;
        }
      }
    });

    return `import { ModuleInstall } from '@components' \n\n<ModuleInstall urlPrefix='${gitmodules['submodule "wiki/weather-kit"'].url.replace(/.wiki.git$/, '')}/releases/latest/download/' urls={${JSON.stringify(urls)}} />`;
  }

  return content;
});

console.log(sections.join('\n\n'));
