import { NavIcon } from '@iringo/doc-ui';
import Theme from 'rspress/theme';

import './layout.css';

export const Layout = () => {
  return <Theme.Layout beforeNavTitle={<NavIcon />} />;
};