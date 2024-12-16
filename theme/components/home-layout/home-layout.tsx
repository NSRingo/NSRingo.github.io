import { normalizeHrefInRuntime, usePageData } from 'rspress/runtime';
import { Button, HomeFeature, HomeFooter, renderHtmlOrText } from 'rspress/theme';

import { isExternalUrl, withBase } from '@rspress/shared';
import { useMemo } from 'react';
import { Logo } from '../logo';

import styles from './home-layout.module.scss';
import { ICON_MAP } from './icons';

const icons = Object.keys(ICON_MAP);

import './home-layout.css';
import { Contributors } from '@iringo/doc-ui';

export const HomeLayout = () => {
  const {
    page: { frontmatter: pageFrontmatter, routePath },
  } = usePageData();

  const frontmatter = useMemo(() => {
    const result = { ...pageFrontmatter };
    (result.features as Record<string, string>[]).forEach((feature) => {
      if (feature.iconKey && icons.includes(feature.iconKey)) {
        const icon = ICON_MAP[feature.iconKey as keyof typeof ICON_MAP];
        feature.icon = `<picture><source type="image/webp" srcset="${icon.webp}" /><img src="${icon.png}" /></picture>`;
      }
    });
    return result;
  }, [pageFrontmatter]);

  const hero: Record<string, any> = frontmatter?.hero || {};

  return (
    <>
      <main className={styles.main}>
        <div className={styles.heroBg}>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index.toString()} className={styles.heroBgItem} style={{ '--index': index }} />
          ))}
        </div>
        <div className="m-auto flex flex-col md:flex-row max-w-6xl min-h-[50vh] mt-12 sm:mt-0 mb-16">
          <div
            className={`flex flex-col justify-center items-center text-center max-w-xl sm:max-w-4xl m-auto order-2 md:order-1 ${styles.hero}`}
          >
            <Logo />
            <h1
              className={`font-bold text-3xl pb-2 sm:text-6xl md:text-7xl m-auto sm:m-4 md:m-0 md:pb-3 lg:pb-2 leading-tight z-10 ${styles.heroTitle}`}
            >
              {renderHtmlOrText(hero.name)}
            </h1>
            <p className="rspress-home-hero-text mx-auto md:m-0 text-3xl sm:text-5xl md:text-6xl font-bold z-10 sm:max-w-4xl">
              {renderHtmlOrText(hero.text)}
            </p>
            <p className="rspress-home-hero-tagline whitespace-pre-wrap m-auto md:m-0 text-sm sm:tex-xl md:text-[1.5rem] text-text-2 font-medium z-10 sm:max-w-4xl">
              {renderHtmlOrText(hero.tagline)}
            </p>
            <div className="grid md:flex md:flex-wrap md:justify-center gap-3 m--1.5 pt-4 sm:pt-6 z-10">
              {hero.actions?.map((action: any) => {
                const link = isExternalUrl(action.link)
                  ? action.link
                  : normalizeHrefInRuntime(withBase(action.link, routePath));
                return (
                  <div className="flex flex-shrink-0 p-1" key={link}>
                    <Button
                      type="a"
                      href={link}
                      text={renderHtmlOrText(action.text)}
                      theme={action.theme}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <HomeFeature frontmatter={frontmatter} routePath={routePath} />
        <HomeFooter />
      </main>
      <footer className="m-auto max-w-6xl text-sm text-text-2 py-8">
        © 2024 iRingo core team. All Rights Reserved.
        <div className="flex items-center">
          Documented by
          <Contributors repo="NSRingo/NSRingo.github.io" />
        </div>
      </footer>
    </>
  );
};
