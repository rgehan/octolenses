import cx from 'classnames';
import { partition } from 'lodash';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { IsDarkContext } from '../../contexts/isDark';
import { SETTINGS_VIEWS, SettingView } from './SettingsModal';

const Wrapper = styled.div`
  width: 200px;
  font-family: Roboto;
  padding-right: 30px;
  flex-shrink: 0;
`;

const ItemHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding-left: 12px;
  margin-bottom: 14px;
`;

const Item = styled.div`
  font-size: 18px;
  padding: 6px;
  padding-left: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

interface IProps {
  selectedTab: string;
  selectTab: Function;
}

export const Sidebar = ({ selectedTab, selectTab }: IProps) => {
  const [providerItems, staticItems] = partition(SETTINGS_VIEWS, 'isProvider');
  const isDark = useContext(IsDarkContext);

  function renderItems(items: SettingView[]) {
    return items.map(({ label, id }) => (
      <Item
        onClick={() => selectTab(id)}
        className={cx(
          selectedTab === id && 'text-white bg-blue font-medium rounded',
          isDark && 'text-grey'
        )}
      >
        {label}
      </Item>
    ));
  }

  const headerClass = isDark ? 'text-grey-darker' : 'text-grey';

  return (
    <Wrapper>
      <ItemHeader className={headerClass}>Settings</ItemHeader>
      {renderItems(staticItems)}
      <ItemHeader className={cx('mt-10', headerClass)}>Providers</ItemHeader>
      {renderItems(providerItems)}
    </Wrapper>
  );
};
