import { Contributors, NavIcon } from '@iringo/doc-ui';
import { usePageData } from '@rspress/core/runtime';
import {Layout as BaseLayout} from '@rspress/core/theme';
import Github from '@theme-assets/github';
import { useEffect, useMemo } from 'react';
import { useTopArrived } from './hooks/use-top-arrived';

import styles from './layout.module.scss';

import './layout.css';

export const Layout = (props: React.ComponentProps<typeof BaseLayout>) => {
  const { topArrived } = useTopArrived();

  useEffect(() => {
    if (topArrived) {
      document.body.classList.add(styles.topArrived);
    } else {
      document.body.classList.remove(styles.topArrived);
    }
    return () => {
      document.body.classList.remove(styles.topArrived);
    };
  }, [topArrived]);

  const { page } = usePageData();

  const afterDocContent = useMemo(() => {
    if (!page.frontmatter?.repo) {
      return null;
    }
    const repo = page.frontmatter.repo as `${string}/${string}`;
    return (
      <div className={styles.repo}>
        <div
          className={`inline-block rounded border border-solid border-gray-light-3 dark:border-divider text-gray-400 ${styles.sourceCode}`}
        >
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            className="flex items-center content-center transition-all duration-300 text-xs block px-2 py-1 "
            rel="noreferrer"
          >
            <span className="mr-2 inline-flex w-4 h-4">
              <Github />
            </span>
            <span>{repo}</span>
          </a>
        </div>
        <Contributors repo={repo} />
      </div>
    );
  }, [page.frontmatter?.repo]);

  return <BaseLayout {...props} beforeNavTitle={<NavIcon />} afterDocContent={afterDocContent} />;
};
