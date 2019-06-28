import cx from 'classnames';
import React from 'react';

import { Issue } from './IssueCard';

const ISSUE_STATUS_COLORS: Record<Issue['state'], string> = {
  open: 'text-green-500',
  closed: 'text-red-500',
  merged: 'text-purple-500',
};

interface IProps {
  type: Issue['type'];
  state: Issue['state'];
}

export const IssueStatusIndicator = ({ type, state }: IProps) => (
  <i
    className={cx(
      'mr-2',
      type === 'PullRequest'
        ? 'fas fa-code-branch'
        : 'fas fa-exclamation-circle',
      ISSUE_STATUS_COLORS[state.toLowerCase() as Issue['state']]
    )}
  />
);
