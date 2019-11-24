import cx from 'classnames';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';

import { settingsStore } from '../../store';

interface IProps {
  value: string;
  name: string;
  items: IOption[];
  onChange: (option: IOption) => void;
  className?: string;
}

interface IOption {
  value: string;
  name: string;
}

@observer
export class Dropdown extends React.Component<IProps> {
  public handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, onChange } = this.props;
    onChange({ name, value: event.target.value });
  };

  public render() {
    const { name, items, value, className } = this.props;

    return (
      <div
        className={cx(
          'w-48 flex relative rounded shadow-lg',
          settingsStore.isDark ? 'bg-gray-800 text-white' : 'bg-white',
          className
        )}
      >
        <select
          onChange={this.handleChange}
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
  }
}
