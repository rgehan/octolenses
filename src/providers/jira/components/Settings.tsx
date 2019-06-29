import { observer } from 'mobx-react';
import React from 'react';

import { JiraProvider } from '..';
import { AvailableResources } from './AvailableResources';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

interface IProps {
  provider: JiraProvider;
}

export const Settings = observer(({ provider }: IProps) => (
  <div className="flex-1 flex flex-col items-stretch">
    {provider.settings.auth ? (
      <LogoutButton provider={provider} />
    ) : (
      <LoginButton provider={provider} />
    )}

    <AvailableResources resources={provider.resources} />
  </div>
));
