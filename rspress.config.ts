import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'rspress/config';
import { changelogPlugin } from './plugins/changelog';
import { ignorePlugin } from './plugins/ignore';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'iRingo',
  description: '解锁完整的  Apple 功能和集成服务',
  // icon: '/rspress-icon.png',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  globalStyles: path.resolve('./styles/global.css'),
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
        (url: object, node: object) => {
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
                default:
                  //console.log(url.pathname);
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
    ignorePlugin(),
    changelogPlugin({
      repos: [
        {
          name: '🌤 天气服务',
          path: '🌤-天气服务',
          repo: 'NSRingo/WeatherKit',
        },
        {
          name: '📍 定位服务',
          path: '📍-定位服务',
          repo: 'NSRingo/GeoServices',
        },
        {
          name: '🗺 地图',
          path: '🗺-地图',
          repo: 'NSRingo/GeoServices',
        },
        {
          name: '🟥 Apple智能与Siri',
          path: '🟥-Apple智能与Siri',
          repo: 'NSRingo/Siri',
        },
        {
          name: '⭕ Siri与搜索',
          path: '⭕-Siri与搜索',
          repo: 'NSRingo/Siri',
        },
        {
          name: '📺 TV',
          path: '📺-TV',
          repo: 'NSRingo/TV',
        },
        {
          name: '📰 News',
          path: '📰-News',
          repo: 'NSRingo/News',
        },
        {
          name: '✈ TestFlight',
          path: '✈-TestFlight',
          repo: 'NSRingo/TestFlight',
        },
      ],
    }),
  ],
});
