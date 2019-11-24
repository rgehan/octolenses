import cx from 'classnames';
import { chain } from 'lodash';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { JiraProvider } from '..';
import { Button, ButtonType } from '../../../components/Button';
import { SettingsStore } from '../../../store/settings';
import { ISwapResult, swapToken } from '../fetchers/swapToken';

const CLIENT_ID = '4WgiRI4XRQ2OTWof5i7yCKmlekkIldH0';

interface IProps {
  provider: JiraProvider;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const LoginButton = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ provider, settingsStore }) => {
  async function handleLogin() {
    try {
      const data = await initJiraOauthFlow();
      provider.setAuth(data);
    } catch (error) {
      console.error('Could not connect the Jira account', error);
    }
  }

  return (
    <>
      <div className="font-medium mb-4">Connect your Atlassian account</div>
      <p>
        Click on the button below to connect OctoLenses to your Atlassian
        account.
      </p>
      <Button
        onClick={handleLogin}
        type={ButtonType.PRIMARY}
        className="self-start mt-4"
      >
        <i className="fas fa-sign-in-alt" /> Connect your account
      </Button>
      <p
        className={cx(
          'text-base mt-4',
          settingsStore.isDark ? 'text-gray-600' : 'text-gray-500'
        )}
      >
        The only way to connect your Atlassian account is using the OAuth flow.
        This means you’ll have to grant access to your account to the OctoLenses
        Jira application.
      </p>
      <p
        className={cx(
          'text-base mt-4',
          settingsStore.isDark ? 'text-gray-600' : 'text-gray-500'
        )}
      >
        During the authentication flow, a token swap service (whose source code
        is auditable{' '}
        <a
          href="https://github.com/rgehan/octolenses-jira-token-swap-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue"
        >
          here
        </a>
        ) is used in order for you to obtain an access token.
      </p>
    </>
  );
});

/**
 * Start an OAuth authentication flow with Jira.
 * It automatically handles the redirection_url as part of the chrome.identity
 * API. An external (privately hosted by me) token swap service is then used
 * to obtain access/refresh tokens.
 */
async function initJiraOauthFlow(): Promise<ISwapResult> {
  const redirectUri = chrome.identity.getRedirectURL('provider_cb');
  const redirectRegexp = new RegExp(redirectUri + '[#?](.*)');

  return new Promise((resolve, reject) => {
    const options = {
      interactive: true,
      url:
        'https://auth.atlassian.com/authorize' +
        '?audience=api.atlassian.com' +
        `&client_id=${CLIENT_ID}` +
        '&scope=read%3Ajira-user%20read%3Ajira-work%20offline_access' +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&prompt=consent`,
    };

    chrome.identity.launchWebAuthFlow(options, response => {
      // A generic error happened
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError.message);
      }

      // Unable to extract an authorization code from the response
      const authCode = chain(redirectRegexp.exec(response))
        .get(1)
        .split('=')
        .get(1)
        .value();

      if (!authCode) {
        return reject(
          `Couldn't extract a authorization code from Jira response`
        );
      }

      // Swap the authorization code for an access and refresh token.
      swapToken(authCode, redirectUri)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
