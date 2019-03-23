import React, { useState, useContext } from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import { Button, ButtonType } from '../../../components/Button';
import { IsDarkContext } from '../../../contexts/isDark';
import { GithubProvider } from '..';

const CREATE_TOKEN_URL =
  'https://github.com/settings/tokens/new?scopes=repo&description=octolenses-browser-extension';

const Input = styled.input<{ dark?: boolean }>`
  ::placeholder {
    color: ${({ dark }) => (dark ? '#8795a1' : '#b8c2cc')};
    opacity: 1;
  }
`;

interface IProps {
  provider: GithubProvider;
}

export const Settings = ({ provider }: IProps) => {
  const isDark = useContext(IsDarkContext);

  const [token, setToken] = useState(provider.settings.token || '');

  function handleSubmit() {
    provider.settings.token = token;
  }

  return (
    <div className="flex-1 flex flex-col items-stretch">
      <div className="font-medium">Github Personal Access Token</div>
      <div className="mt-4 leading-normal">
        <p>
          You can generate a Personal Access Token on{' '}
          <a className="text-blue" href={CREATE_TOKEN_URL} target="__blank">
            this page
          </a>
          .<br />
          It needs to have the following scope:{' '}
          <span
            className={cx(
              'font-mono px-2 rounded',
              isDark ? 'bg-grey-darkest' : 'bg-grey-lightest'
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
          onChange={event => setToken(event.target.value)}
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
          dark={isDark}
          className={cx(
            'w-full rounded outline-none pl-10 pr-3 py-2 text-grey-dark tracking-wide font-mono',
            isDark ? 'bg-grey-darkest' : 'bg-grey-lightest'
          )}
        />
        <i
          className={cx(
            'fas fa-key absolute pin-l ml-3',
            isDark ? 'text-grey-dark' : 'text-grey'
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
};
