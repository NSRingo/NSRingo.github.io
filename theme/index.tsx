import Theme from 'rspress/theme';
import { HomeLayout } from './components/home-layout';
import { Layout } from './components/layout';

export default {
  ...Theme,
  HomeLayout,
  Layout,
};

export * from 'rspress/theme';
export { ModuleInstall } from '@iringo/doc-ui';
