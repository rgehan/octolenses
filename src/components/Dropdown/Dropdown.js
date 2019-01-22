import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

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
    const { items, value } = this.props;

    return (
      <div className="Dropdown shadow-xl">
        <select onChange={this.handleChange} value={value}>
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <i className="fa fa-caret-down" />
      </div>
    );
  }
}
