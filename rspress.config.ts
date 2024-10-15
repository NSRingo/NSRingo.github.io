import fs from 'node:fs';
import path from 'node:path';
import type { UrlWithStringQuery } from 'node:url';
import type { ChangelogPluginOptions } from 'rspress-plugin-changelog';
import { pluginChangelog } from 'rspress-plugin-changelog';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';
import { ignorePlugin } from './plugins/ignore';

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
  description: '解锁完整的  Apple 功能和集成服务',
  icon: 'https://avatars.githubusercontent.com/u/2111377?s=80&v=4',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  globalStyles: path.resolve('./assets/styles/global.css'),
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
      alias: {
        '../raw/main/images/screenshot': '/docs/guide/images/screenshot',
        './📍-定位服务': '/docs/guide/GeoServices/📍-定位服务',
      },
    },
  },
  markdown: {
    mdxRs: false,
    remarkPlugins: [[require('remark-github')]],
    rehypePlugins: [
      [
        require('rehype-urls'),
        (url: UrlWithStringQuery, node: any) => {
          switch (url.host) {
            case 't.me':
            case 'github.com':
              node.properties.target = '_blank';
              break;
            case null:
              switch (url.pathname) {
                case '/GeoServices/wiki/%F0%9F%93%8D-%E5%AE%9A%E4%BD%8D.html':
                case '/guide/GeoServices/%F0%9F%93%8D-%E5%AE%9A%E4%BD%8D.html':
                  url.pathname = '/guide/GeoServices/location.html';
                  break;
                case '/GeoServices/%F0%9F%97%BA-%E5%9C%B0%E5%9B%BE.html':
                case '/guide/GeoServices/%F0%9F%97%BA-%E5%9C%B0%E5%9B%BE.html':
                  url.pathname = '/guide/GeoServices/map.html';
                  break;
                case '/Siri/%F0%9F%9F%A5-Apple%E6%99%BA%E8%83%BD%E4%B8%8ESiri':
                case '/guide/Siri/%F0%9F%9F%A5-Apple%E6%99%BA%E8%83%BD%E4%B8%8ESiri':
                  url.pathname = '/guide/Siri/apple-intelligence-and-siri.html';
                  break;
                case '/Siri/%E2%AD%95-Siri%E4%B8%8E%E6%90%9C%E7%B4%A2.html':
                case '/guide/Siri/%E2%AD%95-Siri%E4%B8%8E%E6%90%9C%E7%B4%A2.html':
                  url.pathname = '/guide/Siri/siri-and-search.html';
                  break;
                case '/guide/%E2%8C%9A%EF%B8%8F-%EF%A3%BFWATCH.html':
                  url.pathname = '/guide/watch.html';
                  break;
                case '/BoxJs/wiki.html':
                  url.pathname = '/guide/box-js.html';
                  break;
                case '/raw/main/iRingo.BoxJs.json.html':
                case '/raw/main/iRingo.17.BoxJs.json.html':
                  // console.log(url);
                  url.protocol = 'https';
                  url.host = 'github.com';
                  url.pathname = `/NSRingo/BoxJs${url.pathname.replace('.html', '')}`;
                  break;
                default:
                  // console.log(url.pathname);
                  break;
              }
              break;
            default:
              //console.log(url);
              break;
          }
        },
      ],
    ],
  },
  plugins: [
    pluginSitemap({
      domain: siteUrl,
    }),
    ignorePlugin(),
    pluginChangelog({
      fetchOnDev: false,
      items: generateChangelogParams([
        {
          title: '🌤 WeatherKit',
          routePath: 'weather-kit',
          repo: 'NSRingo/WeatherKit',
        },
        {
          title: '📍 定位',
          routePath: 'location',
          repo: 'NSRingo/GeoServices',
        },
        {
          title: '🗺 地图',
          routePath: 'maps',
          repo: 'NSRingo/GeoServices',
        },
        {
          title: '🟥 Apple智能与Siri',
          routePath: 'apple-intelligence-and-siri',
          repo: 'NSRingo/Siri',
        },
        {
          title: '⭕ Siri与搜索',
          routePath: 'siri-and-search',
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
