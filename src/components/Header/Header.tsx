import cx from 'classnames';
import { capitalize } from 'lodash';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';

import { SettingsModal } from '../../containers';
import { IsDarkContext } from '../../contexts/isDark';
import { NavigationStore } from '../../store/navigation';
import { TabLink } from './TabLink';

interface IProps {
  navigation: NavigationStore;
}

const _Header = ({ navigation }: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = useContext(IsDarkContext);

  function renderLink(name: string) {
    const { page, navigateTo } = navigation;
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
              isDark ? 'text-white' : 'text-black'
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
};

export const Header = inject('navigation')(observer(_Header));
