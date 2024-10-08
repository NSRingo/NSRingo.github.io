import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'rspress/config';
import { changelogPlugin } from './plugins/changelog';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'iRingo',
  description: '解锁完整的  Apple 功能和集成服务',
  // icon: '/rspress-icon.png',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
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
  markdown: {
    mdxRs: false,
    remarkPlugins: [[require('remark-github')]],
  },
  plugins: [
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
