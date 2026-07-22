import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { GithubProvider } from '..';
import { Button, ButtonType } from '../../../components/Button';
import { toast } from '../../../components/ToastManager';
import { SettingsStore } from '../../../store/settings';
import {
  IDeviceCodeResponse,
  pollForToken,
  requestDeviceCode,
} from '../fetchers/deviceFlow';
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
  const [deviceCode, setDeviceCode] = useState<IDeviceCodeResponse | null>(
    null
  );
  const [isPolling, setIsPolling] = useState(false);

  async function handleLogin() {
    try {
      const code = await requestDeviceCode();
      setDeviceCode(code);
      setIsPolling(true);

      const accessToken = await pollForToken(code.device_code, code.interval);

      provider.setToken(accessToken);
      setToken(accessToken);
      toast('Successfully signed in with GitHub', 'info');
    } catch (error) {
      console.error('Could not connect the GitHub account', error);
      toast(error.message || 'GitHub sign-in failed', 'error');
    } finally {
      setDeviceCode(null);
      setIsPolling(false);
    }
  }

  function handleCopyCode() {
    if (deviceCode === null) return;
    navigator.clipboard.writeText(deviceCode.user_code);
    toast('Code was copied to the clipboard', 'info');
  }

  function handleSubmit() {
    provider.setToken(token);
    toast('Token was saved', 'info');
  }

  function handleLogout() {
    provider.setToken('');
    setToken('');
    toast('You were signed out', 'info');
  }

  return (
    <div className="flex-1 flex flex-col items-stretch">
      <ProfileCard profile={provider.profile} />
      <div className="font-medium">Sign in with GitHub</div>
      {provider.settings.token ? (
        <div className="mt-4 leading-normal">
          <p>
            <i className="fas fa-check-circle text-green-500 mr-2" />
            You are signed in
            {provider.profile ? ` as @${provider.profile.login}` : ''}.
          </p>
          <Button onClick={handleLogout} className="mt-4">
            <i className="fas fa-sign-out-alt" /> Sign out
          </Button>
        </div>
      ) : deviceCode ? (
        <div className="mt-4">
          <p>Copy this code, you will have to enter it on GitHub:</p>
          <div className="mt-4 flex items-center">
            <span
              onClick={handleCopyCode}
              title="Copy to clipboard"
              className={cx(
                'font-mono text-2xl tracking-widest whitespace-nowrap px-4 py-2 rounded cursor-pointer',
                settingsStore.isDark ? 'bg-gray-800' : 'bg-gray-100'
              )}
            >
              {deviceCode.user_code}
            </span>
            <Button
              onClick={() => window.open(deviceCode.verification_uri, '_blank')}
              type={ButtonType.PRIMARY}
              className="ml-4"
            >
              Continue to GitHub <i className="fas fa-external-link-alt" />
            </Button>
          </div>
          {isPolling && (
            <p className="mt-4">
              <i className="fas fa-spinner fa-spin mr-2" />
              Waiting for you to authorize OctoLenses on GitHub…
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mt-4 leading-normal">
            <p>
              Click the button below, then enter the code on the GitHub page
              that opens. OctoLenses only requests read-only access to your
              issues and pull requests.
            </p>
          </div>
          <Button
            onClick={handleLogin}
            type={ButtonType.PRIMARY}
            className="self-start mt-4"
          >
            <i className="fab fa-github" /> Sign in with GitHub
          </Button>
        </>
      )}
      <p
        className={cx(
          'text-base mt-4',
          settingsStore.isDark ? 'text-gray-600' : 'text-gray-500'
        )}
      >
        To see the private repositories of an organization, the{' '}
        <a
          href="https://github.com/apps/octolenses"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          OctoLenses GitHub App
        </a>{' '}
        must also be installed on it. Organization admins can approve the
        installation request if you are not one.
      </p>
      <div className="font-medium mt-8">Or use a Personal Access Token</div>
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
