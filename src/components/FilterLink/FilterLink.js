import React from 'react';
import cx from 'classnames';
import { size } from 'lodash';

import { Loader } from '../Loader';

import './FilterLink.scss';

export const FilterLink = ({ filter, isSelected, onClick }) => {
  const { loading, error } = filter;
  return (
    <div
      key={filter.id}
      className={cx('FilterLink', isSelected && 'FilterLink--selected')}
      onClick={onClick}
    >
      <span className="FilterLink__ItemsCount">
        {loading && <Loader size={13} color="#abacb9" strokeWidth={12} />}
        {!loading && error && <i className="fa fa-times" />}
        {!loading && !error && size(filter.data)}
      </span>
      <bdi>{filter.label}</bdi>
    </div>
  );
};
