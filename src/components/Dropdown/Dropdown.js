import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import cx from 'classnames';

import { settingsStore } from '../../store';

@observer
export class Dropdown extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { name, onChange } = this.props;
    onChange({ name, value: event.target.value });
  };

  render() {
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
