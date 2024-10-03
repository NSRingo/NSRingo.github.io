import { useMemo } from 'react';
import { Tabs, Tab } from 'rspress/theme';

import styles from './module-install.module.scss';

import IconLoon from './icons/loon.webp';
import IconSurge from './icons/surge.webp';
import IconQx from './icons/qx.webp';
import IconStash from './icons/stash.webp';
import IconEgern from './icons/egern.webp';
import IconShadowrocket from './icons/shadowrocket.webp';


export interface ModuleInstallProps {
  urls: {
    loon?: string;
    surge?: string;
    qx?: string;
    stash?: string;
    egern?: string;
    shadowrocket?: string;
  };
  urlPrefix?: string;
}

const TabLabel: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <div className={styles['tab-label']}>
    <img src={icon} alt='' />
    {label}
  </div>
);

export const ModuleInstall: React.FC<ModuleInstallProps> = ({ urlPrefix = '', urls }) => {
  const values = useMemo(() => {
    const result = [];
    if (urls.loon) result.push(<TabLabel label='Loon' icon={IconLoon} />);
    if (urls.surge) result.push(<TabLabel label='Surge' icon={IconSurge} />);
    if (urls.qx) result.push(<TabLabel label='Quantumult X' icon={IconQx} />);
    if (urls.stash) result.push(<TabLabel label='Stash' icon={IconStash} />);
    if (urls.egern) result.push(<TabLabel label='Egern' icon={IconEgern} />);
    if (urls.shadowrocket) result.push(<TabLabel label='Shadowrocket' icon={IconShadowrocket} />);
    return result;
  }, [urls]);
  return (
    <Tabs groupId='module.install' values={values}>
      <Tab key='install'>Install</Tab>
      <Tab key='usage'>Usage</Tab>
    </Tabs>
  );
};
