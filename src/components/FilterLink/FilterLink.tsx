import cx from 'classnames';
import { size } from 'lodash';
import { inject, observer } from 'mobx-react';
import React from 'react';
import {
  SortableElement,
  SortableHandle,
  SortableElementProps,
} from 'react-sortable-hoc';
import { compose } from 'recompose';

import { Filter } from '../../store/models/filter';
import { SettingsStore } from '../../store/settings';
import { Loader } from '../Loader';

const DragHandle = SortableHandle(
  observer(({ isDark }: { isDark: boolean }) => (
    <i
      className={cx(
        'fas fa-grip-horizontal text-sm mr-1',
        isDark ? 'text-gray-700' : 'text-gray-500'
      )}
    />
  ))
);

interface IProps extends SortableElementProps {
  filter: Filter;
  isSelected: boolean;
  onClick: () => void;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const FilterLink = compose<IInnerProps, IProps>(
  SortableElement,
  inject('settingsStore'),
  observer
)(({ filter, isSelected, onClick, settingsStore }) => {
  const { loading, error } = filter;
  const activeColor = settingsStore.isDark ? 'text-gray-500' : 'text-gray-900';

  return (
    <div
      key={filter.id}
      className={cx(
        'flex items-center text-right rtl pr-4 mb-3 cursor-pointer whitespace-nowrap select-none',
        `hover:${activeColor}`,
        isSelected ? activeColor : 'text-gray-600'
      )}
      onClick={onClick}
    >
      <span
        className={cx(
          'rounded-full flex-shrink-0 flex items-center justify-center text-xs h-4 w-8 ml-2 relative',
          settingsStore.isDark ? 'bg-gray-800' : 'bg-gray-400'
        )}
      >
        {loading && <Loader size={13} strokeWidth={12} />}
        {!loading && error && <i className="fa fa-times" />}
        {!loading && !error && size(filter.data)}
        {filter.newItemsCount > 0 && !filter.loading && (
          <div className="absolute right-0 top-0 w-4 h-4 -mr-2 -mt-2 bg-red-600 text-white rounded-full flex items-center justify-center">
            {filter.newItemsCount <= 99 ? (
              <span className="text-2xs">{filter.newItemsCount}</span>
            ) : (
              <span className="text-base">•</span>
            )}
          </div>
        )}
      </span>
      <bdi>{filter.label}</bdi>
      <DragHandle isDark={settingsStore.isDark} />
    </div>
  );
});
