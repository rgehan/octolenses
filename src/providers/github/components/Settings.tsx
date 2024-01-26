import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { GithubProvider } from '..';
import { Button, ButtonType } from '../../../components/Button';
import { toast } from '../../../components/ToastManager';
import { SettingsStore } from '../../../store/settings';
import { ProfileCard } from './ProfileCard';

const CREATE_TOKEN_URL =
  'https://github.com/settings/tokens/new?scopes=repo&description=octolenses';

const Input = styled.input<{ dark?: boolean }>`
  ::placeholder {
    color: ${({ dark }) => (dark ? '#8795a1' : '#b8c2cc')};
    opacity: 1;
  }
`;

interface IProps {
  provider: GithubProvider;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const Settings = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ provider, settingsStore }) => {
  const [token, setToken] = useState(provider.settings.token || '');

  function handleSubmit() {
    provider.setToken(token);
    toast('Token was saved', 'info');
  }

  return (
    <div className="flex-1 flex flex-col items-stretch">
      <ProfileCard profile={provider.profile} />
      <div className="font-medium">Github Personal Access Token</div>
      <div className="mt-4 leading-normal">
        <p>
          You can generate a Personal Access Token on{' '}
          <a
            className="text-blue-500"
            href={CREATE_TOKEN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            this page
          </a>
          .<br />
          It needs to have the following scope:{' '}
          <span
            className={cx(
              'font-mono px-2 rounded',
              settingsStore.isDark ? 'bg-gray-800' : 'bg-gray-100'
            )}
          >
            repo
          </span>
        </p>
      </div>
      <div className="relative flex items-center mt-4">
        <Input
          id="token"
          type="password"
          value={token}
          onChange={(event: any) => setToken(event.target.value)}
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
          dark={settingsStore.isDark}
          className={cx(
            'w-full rounded outline-none pl-10 pr-3 py-2 text-gray-600 tracking-wider font-mono',
            settingsStore.isDark ? 'bg-gray-800' : 'bg-gray-100'
          )}
        />
        <i
          className={cx(
            'fas fa-key absolute left-0 ml-3',
            settingsStore.isDark ? 'text-gray-600' : 'text-gray-500'
          )}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit} type={ButtonType.PRIMARY}>
          Save
        </Button>
      </div>
    </div>
  );
});
