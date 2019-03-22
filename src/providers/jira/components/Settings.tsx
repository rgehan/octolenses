import React, { useContext } from 'react';
import { chain } from 'lodash';
import cx from 'classnames';

import { Button } from '../../../components/Button';
import { IsDarkContext } from '../../../contexts/isDark';

// TODO Not use any
export const Settings = ({ settings }: any) => {
  const isDark = useContext(IsDarkContext);

  async function handleLogin() {
    try {
      const data = await initJiraOauthFlow();
      settings.setProviderSetting('jira', 'auth', data);
      console.log('SUCCESS', data);
    } catch (error) {
      console.log('ERROR /!\\', error);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-stretch">
      <div className="font-medium mb-4">Connect your Atlassian account</div>
      <p>
        Click on the button below to connect OctoLenses to your Atlassian
        account.
      </p>
      <Button onClick={handleLogin} type="primary" className="self-start mt-4">
        <i className="fas fa-sign-in-alt" /> Connect your account
      </Button>
      <p
        className={cx(
          'text-base mt-4',
          isDark ? ' text-grey-dark' : ' text-grey'
        )}
      >
        The only way to connect your Atlassian account is using the OAuth flow.
        This means you’ll have to grant access to your account to the OctoLenses
        Jira application.
      </p>
      <p
        className={cx(
          'text-base mt-4',
          isDark ? ' text-grey-dark' : ' text-grey'
        )}
      >
        During the authentication flow, a token swap service (whose source code
        is auditable{' '}
        <a
          href="https://github.com/rgehan/octolenses-jira-token-swap-service"
          target="__blank"
          className="text-blue"
        >
          here
        </a>
        ) is used in order for you to obtain an access token.
      </p>
    </div>
  );
};

/**
 * Start an OAuth authentication flow with Jira.
 * It automatically handles the redirection_url as part of the chrome.identity
 * API. An external (privately hosted by me) token swap service is then used
 * to obtain access/refresh tokens.
 */
async function initJiraOauthFlow() {
  const CLIENT_ID = 'A9UecfzAAARFGbwj3lVgfw8WJ2M4O78f';
  const REDIRECT_URI = chrome.identity.getRedirectURL('provider_cb');
  const REDIRECT_REGEXP = new RegExp(REDIRECT_URI + '[#?](.*)');

  const TOKEN_SWAP_URL = 'http://localhost:3000';

  return new Promise((resolve, reject) => {
    const options = {
      interactive: true,
      url:
        'https://auth.atlassian.com/authorize' +
        '?audience=api.atlassian.com' +
        `&client_id=${CLIENT_ID}` +
        '&scope=read%3Ajira-user%20read%3Ajira-work%20offline_access' +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&response_type=code` +
        `&prompt=consent`,
    };

    chrome.identity.launchWebAuthFlow(options, response => {
      // A generic error happened
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError.message);
      }

      // Unable to extract an authorization code from the response
      const authCode = chain(response.match(REDIRECT_REGEXP))
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
      fetch(TOKEN_SWAP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: authCode,
          redirect_uri: REDIRECT_URI,
        }),
      })
        .then(res => res.json())
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
