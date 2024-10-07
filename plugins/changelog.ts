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
    addPages: async () => {
      const pages: AdditionalPage[] = [];
      for (const repo of repos) {
        process.stdout.write(`Fetching releases for ${repo.name}...`);
        try {
          const res = await fetch(`https://api.github.com/repos/${repo.repo}/releases`);
          process.stdout.write(' - done\n');
          const data = await res.json();
          let content = `---\ntitle: ${repo.name} - 更新日志\n---\n# ${repo.name}`;
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
      return {
        ...config,
        themeConfig: {
          ...config.themeConfig,
          sidebar: {
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
