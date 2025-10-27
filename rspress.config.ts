import fs from "node:fs";
import path from "node:path";
import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig } from "@rspress/core";
import pluginSitemap from "rspress-plugin-sitemap";

const siteUrl = "https://NSRingo.github.io";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "iRingo",
  logoText: "iRingo",
  description: "解锁完整的  Apple 功能和集成服务",
  icon: "/NSRingoMasked/NSRingoMasked64x.png",
  logo: {
    light: "/NSRingoMasked/NSRingoMasked@256x.png",
    dark: "/NSRingoMasked/NSRingoMasked@256x.png",
  },
  head: [
    ["link", { ref: "preconnect", href: "//ipolyfill.edge-byted.com" }],
    ["link", { ref: "dns-prefetch", href: "//ipolyfill.edge-byted.com" }],
    ["script", { src: "//ipolyfill.edge-byted.com/0.0.25/polyfill.min.js", crossorigin: "" }],
  ],
  themeConfig: {
    socialLinks: [
      { icon: "github", mode: "link", content: "https://github.com/NSRingo" },
      {
        icon: {
          svg: fs.readFileSync(path.join(__dirname, "docs", "public", "telegram.svg"), "utf-8"),
        },
        mode: "link",
        content: "https://t.me/GetSomeFries",
      },
    ],
  },
  builderConfig: {
    resolve: {
      alias: {
        "rspress/theme": "@rspress/core/theme",
      },
    },
    plugins: [pluginSass()],
  },
  markdown: {
    remarkPlugins: [[require("remark-github")]],
  },
  plugins: [
    pluginSitemap({
      domain: siteUrl,
    }),
  ],
});
