import { NavIcon } from '@iringo/doc-ui';
import Theme from 'rspress/theme';

const Layout = () => {
  return <Theme.Layout beforeNavTitle={<NavIcon />} />;
};

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';
export { ModuleInstall } from '@iringo/doc-ui';
