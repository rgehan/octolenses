import React from 'react';
import { omit } from 'lodash';

import { EMPTY_FILTER_PAYLOAD } from '../../redux/models/filters';
import { Button } from '../Button';

import './FilterEditModal.scss';

export class FilterEditModal extends React.Component {
  constructor(props) {
    super(props);

    const filter = props.filter
      ? omit(props.filter, 'data')
      : EMPTY_FILTER_PAYLOAD;

    this.state = {
      rawFilter: JSON.stringify(filter, null, 2),
    };
  }

  handleChange = event => {
    this.setState({
      rawFilter: event.target.value,
    });
  };

  handleSubmit = () => {
    const { rawFilter } = this.state;
    const filter = JSON.parse(rawFilter);

    this.props.onApply(filter);
  };

  render() {
    const { onCancel } = this.props;
    const { rawFilter } = this.state;

    return (
      <div className="FilterEditModal">
        <div className="FilterEditModal__Backdrop" />
        <div className="FilterEditModal__Overlay">
          <textarea onChange={this.handleChange} value={rawFilter} />
          <div className="FilterEditModal__OverlayActions">
            <Button onClick={onCancel} type="default">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Apply
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
