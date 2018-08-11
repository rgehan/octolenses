import React from 'react';
import produce from 'immer';
import { omit } from 'lodash';

import { EMPTY_FILTER_PAYLOAD } from '../../redux/models/filters';
import { FilterPredicate } from '../FilterPredicate';
import { Button } from '../Button';
import deleteIcon from '../../assets/delete.svg';

import './FilterEditModal.scss';

export class FilterEditModal extends React.Component {
  constructor(props) {
    super(props);

    const filter = props.filter
      ? omit(props.filter, 'data')
      : EMPTY_FILTER_PAYLOAD;

    this.state = { filter };
  }

  handlePredicateChange = index => ({ value, negated }) => {
    const updatedFilter = produce(this.state.filter, filter => {
      filter.predicates[index].value = value;
      filter.predicates[index].negated = negated;
      return filter;
    });

    this.setState({ filter: updatedFilter });
  };

  handlePredicateDeletion = index => () => {
    const { filter } = this.state;

    const updatedFilter = {
      ...filter,
      predicates: filter.predicates.filter((_, i) => index !== i),
    };

    this.setState({ filter: updatedFilter });
  };

  handleSubmit = () => {
    const { filter } = this.state;
    this.props.onSave(filter);
  };

  render() {
    return (
      <div className="FilterEditModal">
        <div className="FilterEditModal__Backdrop" />
        <div className="FilterEditModal__Overlay">
          {this.renderHeader()}
          {this.renderPredicates()}
          {this.renderActions()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { onCancel } = this.props;
    const { filter } = this.state;

    return (
      <div className="FilterEditModal__Header">
        <div className="FilterEditModal__Header-Title">{filter.label}</div>
        <img src={deleteIcon} onClick={onCancel} />
      </div>
    );
  }

  renderPredicates() {
    const { filter } = this.state;

    return (
      <div className="FilterEditModal__Predicates">
        {filter.predicates.map((predicate, index) => (
          <FilterPredicate
            key={index}
            {...predicate}
            onChange={this.handlePredicateChange(index)}
            onDelete={this.handlePredicateDeletion(index)}
          />
        ))}
      </div>
    );
  }

  renderActions() {
    const { onCancel } = this.props;

    return (
      <div className="FilterEditModal__Actions">
        <Button onClick={onCancel} type="default">
          Cancel
        </Button>
        <Button onClick={this.handleSubmit} type="primary">
          Save
        </Button>
      </div>
    );
  }
}
