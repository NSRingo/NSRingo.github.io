import { useMemo } from 'react';
import { Tabs, Tab, EditLink } from 'rspress/theme';

import styles from './module-install.module.scss';

type SupportedApp = 'loon' | 'surge' | 'qx' | 'stash' | 'egern' | 'shadowrocket';

const labelTextMap: Record<SupportedApp, string> = {
  loon: 'Loon',
  surge: 'Surge',
  qx: 'Quantumult X',
  stash: 'Stash',
  egern: 'Egern',
  shadowrocket: 'Shadowrocket',
};

const TabLabel: React.FC<{ type: SupportedApp }> = ({ type }) => (
  <div className={styles.label}>
    <div className={[styles.icon, styles[`icon-${type}`]].join(' ')} />
    {labelTextMap[type]}
  </div>
);

const urlTemplateMap: Record<SupportedApp, null | ((url: string) => string)> = {
  loon: (url) => {
    const result = new URL('https://www.nsloon.com/openloon/import');
    result.searchParams.set('plugin', url);
    return result.toString();
  },
  surge: (url) => {
    const result = new URL('surge:///install-module');
    result.searchParams.set('url', url);
    return result.toString();
  },
  qx: (url) => {
    const result = new URL('quantumult-x:///add-resource');
    result.searchParams.set('remote-resource', JSON.stringify({ rewrite_remote: [url] }));
    return result.toString();
  },
  stash: (url) => {
    return `https://link.stash.ws/install-override/${url.replace('^https?://', '')}`;
  },
  egern: null,
  shadowrocket: (url) => {
    const result = new URL('shadowrocket://install');
    result.searchParams.set('module', url);
    return result.toString();
  },
};

const manualInstallTemplateMap: Record<
  SupportedApp,
  {
    urlTitle: string;
    path: string;
  }
> = {
  loon: {
    urlTitle: '插件地址',
    path: '配置 > 插件 > 插件',
  },
  surge: {
    urlTitle: '模块地址',
    path: '首页 > 修改 > 模块 > 安装新模块',
  },
  qx: {
    urlTitle: '重写路径',
    path: '重写 > 引用',
  },
  stash: {
    urlTitle: '覆写地址',
    path: '首页 > 覆写 > 安装覆写',
  },
  egern: {
    urlTitle: '模块地址',
    path: '工具 > 模块',
  },
  shadowrocket: {
    urlTitle: '模块地址',
    path: '配置 > 模块 > 右上角加号',
  },
};

const TabContent: React.FC<{ type: SupportedApp; url: string }> = ({ type, url }) => {
  const urlTemplate = urlTemplateMap[type];
  const urlToOpen = urlTemplate ? urlTemplate(url) : url;
  const manualInstallTemplate = manualInstallTemplateMap[type];
  return (
    <div className={['rspress-directive', styles.container].join(' ')}>
      {urlToOpen && (
        <>
          <div>
            <div className='rspress-directive-title'>一键安装</div>
            <a href={urlToOpen}>点击一键安装</a>
          </div>
          <hr className='my-4 border-t border-solid border-divider-light' />
        </>
      )}
      <div>
        <div className='rspress-directive-title'>手动安装</div>
        <div className='mb-2'>
          <strong>安装路径</strong>
          <div>{manualInstallTemplate.path}</div>
        </div>

        <div>
          <strong>{manualInstallTemplate.urlTitle}</strong>
          <div className={styles['url-wrap']}>
            <div className='rspress-scrollbar'>
              <code>{url}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ModuleInstallProps {
  urls: {
    [key in SupportedApp]?: string;
  };
  urlPrefix?: string;
}

export const ModuleInstall: React.FC<ModuleInstallProps> = ({ urlPrefix = '', urls }) => {
  const values = useMemo(() => {
    const result = [];
    if (urls.loon) result.push(<TabLabel type='loon' />);
    if (urls.surge) result.push(<TabLabel type='surge' />);
    if (urls.qx) result.push(<TabLabel type='qx' />);
    if (urls.stash) result.push(<TabLabel type='stash' />);
    if (urls.egern) result.push(<TabLabel type='egern' />);
    if (urls.shadowrocket) result.push(<TabLabel type='shadowrocket' />);
    return result;
  }, [urls]);

  const renderContent = useMemo(() => {
    const result = [];
    if (urls.loon)
      result.push(
        <Tab key='loon'>
          <TabContent type='loon' url={`${urlPrefix}${urls.loon}`} />
        </Tab>
      );
    if (urls.surge)
      result.push(
        <Tab key='surge'>
          <TabContent type='surge' url={`${urlPrefix}${urls.surge}`} />
        </Tab>
      );
    if (urls.qx)
      result.push(
        <Tab key='qx'>
          <TabContent type='qx' url={`${urlPrefix}${urls.qx}`} />
        </Tab>
      );
    if (urls.stash)
      result.push(
        <Tab key='stash'>
          <TabContent type='stash' url={`${urlPrefix}${urls.stash}`} />
        </Tab>
      );
    if (urls.egern)
      result.push(
        <Tab key='egern'>
          <TabContent type='egern' url={`${urlPrefix}${urls.egern}`} />
        </Tab>
      );
    if (urls.shadowrocket)
      result.push(
        <Tab key='shadowrocket'>
          <TabContent type='shadowrocket' url={`${urlPrefix}${urls.shadowrocket}`} />
        </Tab>
      );
    return result;
  }, [urlPrefix, urls]);

  return (
    <Tabs groupId='module.install' values={values}>
      {renderContent}
    </Tabs>
  );
};
