import React from 'react';
import cx from 'classnames';

import { JiraIssue } from './IssueCard';

interface IProps {
  issue: JiraIssue;
}

type JiraColor = 'green' | 'yellow' | 'blue-gray';

const COLORS_TO_STYLE: Record<JiraColor, string> = {
  green: 'text-green bg-green-lightest',
  yellow: 'text-yellow-darker bg-yellow-lighter',
  'blue-gray': 'text-blue-dark bg-blue-lightest',
};

export const StatusBadge = ({ issue }: IProps) => {
  const name = issue.fields.status.name;
  const colorName = issue.fields.status.statusCategory.colorName;

  return (
    <div
      className={cx(
        'rounded px-2 py-1 ml-3 whitespace-no-wrap',
        COLORS_TO_STYLE[colorName as JiraColor]
      )}
    >
      {name}
    </div>
  );
};
