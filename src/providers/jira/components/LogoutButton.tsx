import { observer } from 'mobx-react';
import React from 'react';

import { JiraProvider } from '..';
import { Button, ButtonType } from '../../../components/Button';

interface IProps {
  provider: JiraProvider;
}

export const LogoutButton = observer(({ provider }: IProps) => {
  function handleLogout() {
    provider.disconnect();
  }

  return (
    <>
      <div className="font-medium mb-4">Connect your Atlassian account</div>
      <p>Your Atlassian account is properly connected to OctoLenses.</p>
      <Button
        onClick={handleLogout}
        type={ButtonType.PRIMARY}
        className="self-start mt-4"
      >
        <i className="fas fa-sign-out-alt" /> Disconnect your account
      </Button>
    </>
  );
});
