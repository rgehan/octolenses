import cx from 'classnames';
import { capitalize } from 'lodash';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { SettingsModal } from '../../containers';
import { navigationStore, settingsStore } from '../../store';
import { TabLink } from './TabLink';

export const Header = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);

  function renderLink(name: string) {
    const { page, navigateTo } = navigationStore;
    return (
      <TabLink onClick={() => navigateTo(name)} active={page === name}>
        {capitalize(name)}
      </TabLink>
    );
  }

  return (
    <React.Fragment>
      <div className="h-24 flex flex-col Header">
        <div className="flex items-center">
          <a
            href="https://github.com/rgehan/octolenses"
            className={cx(
              'font-roboto text-4xl font-bold mt-4',
              settingsStore.isDark ? 'text-white' : 'text-gray-900'
            )}
          >
            <i className="fab fa-github mr-3" />
            <span>OctoLenses</span>
          </a>
          <div className="tabs flex-1 flex justify-end">
            {renderLink('dashboard')}
            {renderLink('discover')}
            <TabLink onClick={() => setModalOpen(true)}>
              <i className="fa fa-cog" />
            </TabLink>
          </div>
        </div>
      </div>
      {modalOpen && <SettingsModal onClose={() => setModalOpen(false)} />}
    </React.Fragment>
  );
});
