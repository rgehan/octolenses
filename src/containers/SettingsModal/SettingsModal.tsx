import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../../components/Modal';
import { SETTINGS_VIEWS } from './constants';
import { Panel } from './Panel';
import { Sidebar } from './Sidebar';

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
