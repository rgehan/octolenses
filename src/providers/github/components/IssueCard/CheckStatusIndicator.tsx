import cx from 'classnames';
import React from 'react';

import { Issue, IssueStatus } from './IssueCard';

interface IProps {
  status: Issue['status'];
}

const STATUS_TO_ICON = {
  [IssueStatus.SUCCESS]: 'fas fa-check text-green',
  [IssueStatus.FAILURE]: 'fas fa-times text-red',
  [IssueStatus.PENDING]: 'fas fa-circle text-orange',
};

export const CheckStatusIndicator = ({ status }: IProps) => {
  if (status === IssueStatus.UNKNOWN) {
    return null;
  }

  const icon = STATUS_TO_ICON[status];

  return <i className={cx('text-sm ml-2', icon)} />;
};
