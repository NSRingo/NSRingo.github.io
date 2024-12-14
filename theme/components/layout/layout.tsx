import { NavIcon } from '@iringo/doc-ui';
import Theme from 'rspress/theme';

import { useEffect } from 'react';
import { useTopArrived } from './hooks/use-top-arrived';

import styles from './layout.module.scss';

import './layout.css';

export const Layout = () => {
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

  return <Theme.Layout beforeNavTitle={<NavIcon />} />;
};
