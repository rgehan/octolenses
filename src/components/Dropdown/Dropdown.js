import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';

@inject('settings')
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
    const { items, value, settings } = this.props;

    return (
      <div
        className={cx(
          'w-48 flex relative rounded shadow-xl',
          settings.isDark ? 'bg-grey-darkest text-white' : 'bg-white'
        )}
      >
        <select
          onChange={this.handleChange}
          value={value}
          className={cx(
            'flex-1 border-none bg-transparent cursor-pointer outline-none appearance-none py-2 px-3',
            settings.isDark && 'text-white'
          )}
        >
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <i className="fa fa-caret-down absolute pin-r mt-2 mr-3" />
      </div>
    );
  }
}
