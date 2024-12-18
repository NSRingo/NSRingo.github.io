import fs from 'node:fs';
import path from 'node:path';
import type { ChangelogPluginOptions } from 'rspress-plugin-changelog';
import { pluginChangelog } from 'rspress-plugin-changelog';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';

const siteUrl = 'https://NSRingo.github.io';

const generateChangelogParams = (items: Omit<ChangelogPluginOptions['items'][number], 'type'>[]) =>
  items.map<ChangelogPluginOptions['items'][number]>((item) => ({
    type: 'github-releases',
    templatePath: './changelog.handlebars',
    ...item,
  }));

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'iRingo',
  logoText: 'iRingo',
  description: '解锁完整的  Apple 功能和集成服务',
  icon: '/NSRingoMasked/NSRingoMasked64x.png',
  logo: {
    light: '/NSRingoMasked/NSRingoMasked@256x.png',
    dark: '/NSRingoMasked/NSRingoMasked@256x.png',
  },
  head: [
    ['link', { ref: 'preconnect', href: '//ipolyfill.edge-byted.com' }],
    ['link', { ref: 'dns-prefetch', href: '//ipolyfill.edge-byted.com' }],
    ['script', { src: '//ipolyfill.edge-byted.com/0.0.25/polyfill.min.js', crossorigin: '' }],
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/NSRingo' },
      {
        icon: {
          svg: fs.readFileSync(path.join(__dirname, 'docs', 'public', 'telegram.svg'), 'utf-8'),
        },
        mode: 'link',
        content: 'https://t.me/GetSomeFries',
      },
    ],
  },
  builderConfig: {
    source: {
      alias: {},
    },
  },
  markdown: {
    mdxRs: false,
    remarkPlugins: [[require('remark-github')]],
  },
  plugins: [
    pluginSitemap({
      domain: siteUrl,
    }),
    pluginChangelog({
      fetchOnDev: false,
      items: generateChangelogParams([
        {
          title: '🌤 WeatherKit',
          routePath: 'weather-kit',
          repo: 'NSRingo/WeatherKit',
        },
        {
          title: '🛰️ 地理服务',
          routePath: 'GeoServices',
          repo: 'NSRingo/GeoServices',
        },
        {
          title: '⭕ Siri',
          routePath: 'Siri',
          repo: 'NSRingo/Siri',
        },
        {
          title: '📺 TV',
          routePath: 'apple-tv',
          repo: 'NSRingo/TV',
        },
        {
          title: '📰 News',
          routePath: 'apple-news',
          repo: 'NSRingo/News',
        },
        {
          title: '✈ TestFlight',
          routePath: 'test-flight',
          repo: 'NSRingo/TestFlight',
        },
      ]),
    }),
  ],
});
