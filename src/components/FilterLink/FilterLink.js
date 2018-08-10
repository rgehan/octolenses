import React from 'react';
import cx from 'classnames';
import { size } from 'lodash';

import { Loader } from '../Loader';

import './FilterLink.scss';

export const FilterLink = ({ filter, isSelected, onClick }) => (
  <div
    key={filter.id}
    className={cx('FilterLink', isSelected && 'FilterLink--selected')}
    onClick={onClick}
  >
    <span className="FilterLink__ItemsCount">
      {filter.loading ? (
        <Loader size={13} color="#abacb9" strokeWidth={12} />
      ) : (
        size(filter.data)
      )}
    </span>
    <bdi>{filter.label}</bdi>
  </div>
);
