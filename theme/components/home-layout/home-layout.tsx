import { normalizeHrefInRuntime, usePageData } from 'rspress/runtime';
import { Button, HomeFeature, HomeFooter, HomeHero, renderHtmlOrText } from 'rspress/theme';

import { useEffect } from 'react';
import { useTopArrived } from './hooks/use-top-arrived';

import { isExternalUrl, withBase } from '@rspress/shared';
import styles from './home-layout.module.scss';

export const HomeLayout = () => {
  const {
    page: { frontmatter, routePath },
  } = usePageData();

  const hero: Record<string, any> = frontmatter?.hero || {};

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

  return (
    <>
      <div className={styles.hero}>
        <div className="m-auto flex flex-col md:flex-row max-w-6xl min-h-[50vh] mt-12 sm:mt-0">
          <div className="flex flex-col justify-center items-center text-center max-w-xl sm:max-w-4xl m-auto order-2 md:order-1">
            <img src="/NSRingoKit/NSRingoKit@256x.png" srcSet="/NSRingoKit/NSRingoKit@512x.png 2x" alt="" />
            <h1 className="font-bold text-3xl pb-2 sm:text-6xl md:text-7xl m-auto sm:m-4 md:m-0 md:pb-3 lg:pb-2 leading-tight z-10">{renderHtmlOrText(hero.name)}</h1>
            <p className='rspress-home-hero-text mx-auto md:m-0 text-3xl sm:text-5xl md:text-6xl sm:pb-2 font-bold z-10 sm:max-w-4xl'>
              {renderHtmlOrText(hero.text)}
            </p>
            <p className="rspress-home-hero-tagline whitespace-pre-wrap pt-4 m-auto md:m-0 text-sm sm:tex-xl md:text-[1.5rem] text-text-2 font-medium z-10 sm:max-w-4xl">
              {renderHtmlOrText(hero.tagline)}
            </p>
            <div className="grid md:flex md:flex-wrap md:justify-center gap-3 m--1.5 pt-6 sm:pt-8 z-10">
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
      </div>
      <div className={styles.heroBg}>
        <div className={styles.heroBgItem} style={{ '--translate-y': '-50%', '--c1': '#01ECFF', '--c2': '#0381C1' }} />
        <div className={styles.heroBgItem} style={{ '--translate-y': '-60%', '--c1': '#00BCFF', '--c2': '#0967BF' }} />
        <div className={styles.heroBgItem} style={{ '--translate-y': '-70%', '--c1': '#0B8EFD', '--c2': '#0B46BB' }} />
      </div>
      <HomeFeature frontmatter={frontmatter} routePath={routePath} />
      <HomeFooter />
    </>
  );
};
