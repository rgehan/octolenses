import React from 'react';
import { chain } from 'lodash';

import { SETTINGS_VIEWS } from './SettingsModal';

interface IProps {
  selectedTab: string;
}

export const Panel = ({ selectedTab }: IProps) => {
  const Component = chain(SETTINGS_VIEWS)
    .find({ id: selectedTab })
    .get('component')
    .value();

  return <Component />;
};
