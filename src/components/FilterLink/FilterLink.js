import React from 'react'
import cx from 'classnames';
import { size } from 'lodash';

import './FilterLink.scss';

export const FilterLink = ({ filter, isSelected, onClick }) => (
  <div
    key={filter.id}
    className={cx(
      'FilterLink',
      isSelected && 'FilterLink--selected'
    )}
    onClick={onClick}
  >
    <span className="FilterLink__ItemsCount">{size(filter.data)}</span>
    {filter.label}
  </div>
);