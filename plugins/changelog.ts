import type { RspressPlugin } from '@rspress/shared';
import type { AdditionalPage } from '@rspress/shared';

interface ChangeLogPluginOptions {
  baseRoutePath?: string;
  repos: {
    name: string;
    path: string;
    repo: string;
  }[];
}

export function changelogPlugin({ baseRoutePath = 'changelog', repos = [] }: ChangeLogPluginOptions): RspressPlugin {
  return {
    name: 'changelog',
    addPages: async (_, isProd) => {
      const needFetch = isProd || process.env.NODE_ENV === 'production';
      const pages: AdditionalPage[] = [];
      for (const repo of repos) {
        try {
          let data = [];
          process.stdout.write(`Fetching releases for ${repo.name}...`);

          let content = `---\ntitle: ${repo.name} - 更新日志\n---\n# ${repo.name}`;

          if (needFetch) {
            const res = await fetch(`https://api.github.com/repos/${repo.repo}/releases`);
            process.stdout.write(' - done\n');
            const resp = await res.json();
            if (Array.isArray(resp)) {
              data = resp;
            }
          } else {
            process.stdout.write(' - skipped\n');
            content += "\n\n:::tip\n开发环境默认不拉取 Changelog，可指定 `NODE_ENV='production'` 强制开启\n:::";
          }

          if (data?.length) {
            for (const release of data) {
              content += '\n\n';
              content += `## [${release.name}](${release.html_url})`;
              content += '\n\n';
              content += release.body;
            }
          }
          pages.push({
            routePath: `${baseRoutePath}/${repo.path}`,
            content,
          });
        } catch (error) {
          process.stdout.write(' - failed\n');
          console.error(error);
        }
      }
      return pages;
    },
    config(config) {
      console.log(config);
      return {
        ...config,
        themeConfig: {
          ...config.themeConfig,
          sidebar: {
            ...config.themeConfig?.sidebar,
            [`/${baseRoutePath}/`]: repos.map((repo) => ({
              text: repo.name,
              link: `${baseRoutePath}/${repo.path}`,
            })),
          },
        },
      };
    },
  };
}
