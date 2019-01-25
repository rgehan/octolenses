import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { size } from 'lodash';
import { Loader } from '../Loader';

export const FilterLink = observer(({ filter, isSelected, onClick, dark }) => {
  const { loading, error } = filter;
  const activeColor = dark ? 'text-grey' : 'text-grey-darkest';
  return (
    <div
      key={filter.id}
      className={cx(
        'flex items-center text-right rtl pr-4 mb-3 cursor-pointer whitespace-no-wrap select-none',
        `hover:${activeColor}`,
        isSelected ? activeColor : 'text-grey-dark'
      )}
      onClick={onClick}
    >
      <span
        className={cx(
          'rounded-full flex items-center justify-center text-xs h-4 w-8 ml-2',
          dark ? 'bg-grey-darkest' : 'bg-grey-light'
        )}
      >
        {loading && <Loader size={13} color="#abacb9" strokeWidth={12} />}
        {!loading && error && <i className="fa fa-times" />}
        {!loading && !error && size(filter.data)}
      </span>
      <bdi>{filter.label}</bdi>
    </div>
  );
});
