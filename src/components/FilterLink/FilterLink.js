import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { size } from 'lodash';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import { Loader } from '../Loader';

const DragHandle = SortableHandle(({ dark }) => (
  <i
    className={cx(
      'fas fa-grip-horizontal text-sm mr-1',
      dark ? 'text-grey-darker' : 'text-grey'
    )}
  />
));

export const FilterLink = SortableElement(
  observer(({ filter, isSelected, onClick, dark }) => {
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
            'rounded-full flex-no-shrink flex items-center justify-center text-xs h-4 w-8 ml-2 relative',
            dark ? 'bg-grey-darkest' : 'bg-grey-light'
          )}
        >
          {loading && <Loader size={13} color="#abacb9" strokeWidth={12} />}
          {!loading && error && <i className="fa fa-times" />}
          {!loading && !error && size(filter.data)}
          {filter.newItemsCount > 0 &&
            !filter.loading && (
              <div className="absolute pin-r pin-t w-4 h-4 -mr-2 -mt-2 bg-red-dark text-white rounded-full flex items-center justify-center">
                {filter.newItemsCount <= 99 ? (
                  <span className="text-2xs">{filter.newItemsCount}</span>
                ) : (
                  <span className="text-base">•</span>
                )}
              </div>
            )}
        </span>
        <bdi>{filter.label}</bdi>
        <DragHandle dark={dark} />
      </div>
    );
  })
);
