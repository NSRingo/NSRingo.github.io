import { Children, cloneElement, createElement, isValidElement, useMemo } from 'react';
import { Badge, Tab, Tabs } from 'rspress/theme';

import styles from './module-install.module.scss';

const SUPPORTED_APP = ['loon', 'surge', 'qx', 'stash', 'egern', 'shadowrocket'] as const;

type SupportedApp = (typeof SUPPORTED_APP)[number];

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

type BadgeProps = React.ComponentProps<typeof Badge>;
interface TabContentProps {
  type: SupportedApp;
  url: string;
  title?: string;
  badge?: React.ReactNode | { text: React.ReactNode; type: BadgeProps['type'] };
  children?: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ type, url, title, badge, children }) => {
  const urlTemplate = urlTemplateMap[type];
  const urlToOpen = urlTemplate ? urlTemplate(url) : url;
  const manualInstallTemplate = manualInstallTemplateMap[type];
  if (!manualInstallTemplate) {
    return null;
  }
  const badgeProps = useMemo<BadgeProps | null>(() => {
    if (badge && typeof badge === 'object' && 'text' in badge && 'type' in badge) {
      return badge as unknown as BadgeProps;
    }
    if (badge) {
      return {
        type: 'warning',
        text: badge as string,
      };
    }
    return null;
  }, [badge]);

  return (
    <div className={['rspress-directive', styles.container].join(' ')}>
      {title || badge ? (
        <div className={[styles['item-title'], 'mb-2'].join(' ')}>
          {title && <div>{title}</div>}
          {badgeProps ? (
            <span className={styles.badge}>
              <Badge {...badgeProps} />
            </span>
          ) : null}
        </div>
      ) : null}
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

      {children ? (
        <>
          <hr className='my-4 border-t border-solid border-divider-light' />
          {children}
        </>
      ) : null}
    </div>
  );
};

export interface ModuleInstallProps {
  urlPrefix?: string;
  urls?: {
    [key in SupportedApp]?: string;
  };
  children?: React.ReactNode;
}

export function ModuleInstall({ urlPrefix = '', urls, children }: ModuleInstallProps) {
  const values = useMemo(() => {
    const result: React.ReactNode[] = [];
    if (urls) {
      SUPPORTED_APP.forEach((type) => {
        if (urls[type]) {
          result.push(<TabLabel key={type} type={type} />);
        }
      });
    } else if (children) {
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          const type = child.props.type;
          if (SUPPORTED_APP.includes(type)) {
            result.push(<TabLabel key={type} type={type} />);
          }
        }
      });
    }
    return result;
  }, [urls, children]);

  const renderContent = useMemo(() => {
    if (children) {
      return Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { __urlPrefix: urlPrefix } as any);
        }
        return null;
      });
    }
    const result: React.ReactNode[] = [];
    SUPPORTED_APP.forEach((type) => {
      const url = urls?.[type];
      if (!url) return;
      result.push(
        <Tab key={type}>
          <TabContent key={url} type={type} url={`${urlPrefix}${url}`} />
        </Tab>
      );
    });

    return result;
  }, [urlPrefix, urls, children]);

  return (
    <Tabs groupId='module.install' values={values}>
      {renderContent}
    </Tabs>
  );
}

const ModuleInstallTab: React.FC<{ type: SupportedApp; __urlPrefix?: string; children?: React.ReactNode }> = ({ type, __urlPrefix, children }) => {
  return (
    <Tab key={type}>
      <div className='text-sm'>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const childType = child.type;
            if (typeof childType !== 'string' && 'displayName' in childType && childType.displayName === 'ModuleInstallItem') {
              return cloneElement(child, { __type: type, __urlPrefix } as any);
            }
            return createElement(
              'div',
              {
                className: 'px-3',
              },
              child
            );
          }
          return child;
        })}
      </div>
    </Tab>
  );
};

const ModuleInstallItem: React.FC<
  {
    __type: SupportedApp;
    __urlPrefix?: string;
  } & Omit<TabContentProps, 'type'>
> = ({ __type, __urlPrefix = '', url, ...rest }) => {
  return <TabContent {...rest} key={url} type={__type} url={`${__urlPrefix}${url}`} />;
};

ModuleInstallItem.displayName = 'ModuleInstallItem';

ModuleInstall.Tab = ModuleInstallTab;
ModuleInstall.Item = ModuleInstallItem;
