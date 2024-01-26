import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { compose } from 'recompose';

import { SettingsStore } from '../../store/settings';

interface IProps {
  value: string;
  name: string;
  items: IOption[];
  onChange: (option: IOption) => void;
  className?: string;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

interface IOption {
  value: string;
  name: string;
}

export const Dropdown = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ name, items, value, className, settingsStore, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({ name, value: event.target.value });
  }

  return (
    <div
      className={cx(
        'w-48 flex relative rounded shadow-lg',
        settingsStore.isDark ? 'bg-gray-800 text-white' : 'bg-white',
        className
      )}
    >
      <select
        onChange={handleChange}
        value={value}
        className={cx(
          'flex-1 border-none bg-transparent cursor-pointer outline-none appearance-none py-2 px-3',
          settingsStore.isDark && 'text-white'
        )}
        data-id={`dropdown-${name}`}
      >
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <i className="fa fa-caret-down absolute right-0 mt-2 mr-3" />
    </div>
  );
});
