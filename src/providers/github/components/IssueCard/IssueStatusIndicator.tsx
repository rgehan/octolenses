import cx from 'classnames';
import React from 'react';

import { IIssue } from './IssueCard';
import {assertUnreachable} from "../../../../lib/assertUnreachable";

interface IProps {
  issue: Pick<IIssue, 'state' | 'isDraft' | 'type'>;
}

export const IssueStatusIndicator = ({ issue }: IProps) => (
  <i
    className={cx(
      'mr-2',
      issue.type === 'PullRequest'
        ? 'fas fa-code-branch'
        : 'fas fa-exclamation-circle',
      getColor(issue.state.toLowerCase() as IIssue['state'], issue.isDraft)
    )}
  />
);

function getColor(state: IIssue['state'], isDraft: boolean)
{
  switch (state) {
    case 'open':
      return isDraft ? 'text-gray-500' : 'text-green-500';
    case 'closed':
      return 'text-red-500';
    case 'merged':
      return 'text-purple-500';
    default:
      return assertUnreachable(state, 'text-gray-500');
  }
}
