import cx from 'classnames';
import ClipboardJS from 'clipboard';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { toast } from '../../../../components/ToastManager/ToastManager';
import { IsDarkContext } from '../../../../contexts/isDark';
import { Issue } from './IssueCard';

const Wrapper = styled.div`
  .overlay {
    display: none;
  }

  :hover {
    .overlay {
      display: flex;
    }
  }
`;

const Overlay = styled.div<{ dark: boolean }>`
  top: 16px;
  left: 2px;

  :before {
    content: '';
    height: 0px;
    width: 1px;
    border-bottom: 4px solid ${({ dark }) => (dark ? '#606f7b' : 'white')};
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: -4px;
    left: 6px;
  }
`;

const makeActions = (issue: Issue) => {
  const type = issue.pull_request ? 'Pull request' : 'Issue';

  return [
    {
      label: 'Copy Link',
      'data-clipboard-text': issue.html_url,
      onClick: () => toast(`${type} link was copied to the clipboard`, 'info'),
    },
    {
      label: 'Copy Title',
      'data-clipboard-text': issue.title,
      onClick: () => toast(`${type} title was copied to the clipboard`, 'info'),
    },
  ];
};

interface IProps {
  issue: Issue;
}

export const ContextualDropdown = ({ issue }: IProps) => {
  const isDark = useContext(IsDarkContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('[data-clipboard-text]');
    return () => clipboard.destroy();
  });

  const actions = makeActions(issue);

  return (
    <Wrapper className="inline-block relative">
      <i className="fa fa-caret-down py-1 px-2 -mt-1 cursor-pointer" />
      <Overlay
        dark={isDark}
        className={cx([
          'overlay',
          'absolute py-1',
          isDark ? 'bg-gray-700' : 'bg-white border border-gray-200',
          'whitespace-no-wrap rounded shadow',
          'flex flex-col',
        ])}
      >
        {actions.map(({ label, ...otherProps }) => (
          <div
            className="text-sm px-4 py-1 cursor-pointer hover:underline"
            key={label}
            {...otherProps}
          >
            {label}
          </div>
        ))}
      </Overlay>
    </Wrapper>
  );
};
