import React, { useState } from 'react';
import { map } from 'lodash';
import styled from 'styled-components';

import { Modal } from '../../components/Modal';
import { providers } from '../../providers';
import { Sidebar } from './Sidebar';
import { Panel } from './Panel';
import { Behavior, NightMode, CacheSettings } from './tabs';

export interface SettingView {
  id: string;
  label: string;
  component: any;
  isProvider?: boolean;
}

export const SETTINGS_VIEWS: SettingView[] = [
  {
    id: 'behavior',
    label: 'Behavior',
    component: Behavior,
  },
  {
    id: 'night_mode',
    label: 'Night mode',
    component: NightMode,
  },
  {
    id: 'cache',
    label: 'Cache',
    component: CacheSettings,
  },
  ...map(providers, ({ label, settingsComponent }, key) => ({
    id: key,
    label,
    component: settingsComponent,
    isProvider: true,
  })),
];

const Container = styled.div`
  width: 900px;
`;

interface IProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: IProps) {
  const [selectedTab, selectTab] = useState(SETTINGS_VIEWS[0].id);

  return (
    <Modal onClose={onClose}>
      <Container className="mt-32 mx-auto flex">
        <Sidebar selectedTab={selectedTab} selectTab={selectTab} />
        <Panel selectedTab={selectedTab} />
      </Container>
    </Modal>
  );
}
