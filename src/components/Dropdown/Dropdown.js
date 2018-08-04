import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import { get } from 'http';

export class Dropdown extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
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
    const { items } = this.props;

    return (
      <div className="Dropdown">
        <select onChange={this.handleChange}>
          {items.map(item => <option value={item.value}>{item.name}</option>)}
        </select>
      </div>
    );
  }
}
