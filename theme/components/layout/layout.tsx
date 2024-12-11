import { NavIcon } from '@iringo/doc-ui';
import Theme from 'rspress/theme';

export const Layout = () => {
  return <Theme.Layout beforeNavTitle={<NavIcon />} />;
};