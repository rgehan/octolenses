import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { omit } from 'lodash';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import { EMPTY_FILTER_PAYLOAD } from '../../store/filters';
import { PREDICATES } from '../../lib/filters';
import { FilterPredicate } from '../../components/FilterPredicate';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

@inject('settings')
@observer
export class FilterEditModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const filter = props.filter
      ? omit(props.filter, 'data')
      : EMPTY_FILTER_PAYLOAD;

    this.state = { filter };
  }

  handleTitleChange = event => {
    const updatedFilter = {
      ...this.state.filter,
      label: event.target.value,
    };

    this.setState({ filter: updatedFilter });
  };

  handleAddPredicate = event => {
    const type = event.target.value;

    if (!type) {
      return;
    }

    const updatedFilter = produce(this.state.filter, filter => {
      filter.predicates.push({ type, value: '' });
      return filter;
    });

    this.setState({ filter: updatedFilter });
  };

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
    const { onClose, settings } = this.props;
    const { filter } = this.state;

    return (
      <Modal
        onClose={onClose}
        className="FilterEditModal"
        dark={settings.isDark}
      >
        <Modal.Header>
          <input
            type="text"
            value={filter.label}
            onChange={this.handleTitleChange}
            className={cx(
              'text-lg bg-transparent border-none outline-none w-full pr-4',
              settings.isDark
                ? 'text-grey hover:text-grey-light'
                : 'text-grey-darkest hover:text-black'
            )}
            autoFocus
          />
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 p-4">
            {filter.predicates.map((predicate, index) => (
              <FilterPredicate
                key={index}
                {...predicate}
                onChange={this.handlePredicateChange(index)}
                onDelete={this.handlePredicateDeletion(index)}
                dark={settings.isDark}
              />
            ))}
            <select
              value=""
              onChange={this.handleAddPredicate}
              className={cx(
                'text-sm bg-transparent appearance-none border-none outline-none cursor-pointer',
                settings.isDark ? 'text-grey' : 'text-black'
              )}
            >
              <option key="__default" value="">
                + Add a predicate
              </option>
              {PREDICATES.map(({ name, label }) => (
                <option key={name} value={name}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={onClose} type="default" className="mr-3">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} type="primary">
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
