import React from 'react';
import cx from 'classnames';

import { Issue } from './IssueCard';

interface IProps {
  status: Issue['status'];
}

export const CheckStatusIndicator = ({ status }: IProps) => {
  if (!status) {
    return null;
  }

  const icon =
    status === 'SUCCESS' ? 'fa-check text-green' : 'fa-times text-red';

  return <i className={cx('fa text-sm ml-2', icon)} />;
};
