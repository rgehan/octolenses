import cx from 'classnames';
import React from 'react';

import { IJiraIssue } from './IssueCard';

interface IProps {
  issue: IJiraIssue;
}

type JiraColor = 'green' | 'yellow' | 'blue-gray';

const COLORS_TO_STYLE: Record<JiraColor, string> = {
  green: 'text-green-500 bg-green-100',
  yellow: 'text-yellow-800 bg-yellow-200',
  'blue-gray': 'text-blue-600 bg-blue-100',
};

export const StatusBadge = ({ issue }: IProps) => {
  const name = issue.fields.status.name;
  const colorName = issue.fields.status.statusCategory.colorName;

  return (
    <div
      className={cx(
        'rounded px-2 py-1 ml-3 whitespace-nowrap',
        COLORS_TO_STYLE[colorName as JiraColor]
      )}
    >
      {name}
    </div>
  );
};
