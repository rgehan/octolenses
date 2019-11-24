import cx from 'classnames';
import React from 'react';

import { IIssue } from './IssueCard';
import { IssueStatus } from './types';

interface IProps {
  status: IIssue['status'];
}

const STATUS_TO_ICON = {
  [IssueStatus.SUCCESS]: 'fas fa-check text-green-500',
  [IssueStatus.FAILURE]: 'fas fa-times text-red-500',
  [IssueStatus.PENDING]: 'fas fa-circle text-orange-500',
};

const STATUS_TO_LABEL = {
  [IssueStatus.SUCCESS]: 'All checks passed',
  [IssueStatus.FAILURE]: 'Some checks have failed',
  [IssueStatus.PENDING]: 'Checks are running',
};

export const CheckStatusIndicator = ({ status }: IProps) => {
  if (status === IssueStatus.UNKNOWN) {
    return null;
  }

  const icon = STATUS_TO_ICON[status];
  const label = STATUS_TO_LABEL[status];

  return <i className={cx('text-sm ml-2', icon)} title={label} />;
};
