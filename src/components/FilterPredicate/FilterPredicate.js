import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isUndefined } from 'lodash';

import { findPredicate } from '../../lib/filters';

import './FilterPredicate.scss';

export class FilterPredicate extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    negated: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    negated: false,
  };

  getPredicate() {
    const { type } = this.props;
    return findPredicate(type);
  }

  getCurrentPayload() {
    const { type, value, negated } = this.props;
    return { type, value, negated };
  }

  handleChange = event => {
    const { onChange } = this.props;

    onChange({
      ...this.getCurrentPayload(),
      value: event.target.value,
    });
  };

  handleNegate = () => {
    const { negated, onChange } = this.props;

    onChange({
      ...this.getCurrentPayload(),
      negated: !negated,
    });
  };

  render() {
    const { negated } = this.props;
    return (
      <div
        className={cx('FilterPredicate', negated && 'FilterPredicate--negated')}
      >
        {this.renderLabel()}
        {this.renderValue()}
        {this.renderActions()}
      </div>
    );
  }

  renderLabel() {
    const { negated } = this.props;
    const predicate = this.getPredicate();

    const isNegatable = isUndefined(predicate.negatable) || predicate.negatable;

    return (
      <div className="FilterPredicate__Label">
        {predicate.label}
        {isNegatable && (
          <div
            onClick={this.handleNegate}
            className={cx(
              'FilterPredicate__Symbol',
              negated && 'FilterPredicate__Symbol--negative'
            )}
          >
            <i className={cx('fa', negated ? 'fa-not-equal' : 'fa-equals')} />
          </div>
        )}
      </div>
    );
  }

  renderValue() {
    const { value } = this.props;
    const predicate = this.getPredicate();

    if (predicate.type === 'text') {
      return (
        <div className="FilterPredicate__Value">
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder={predicate.placeholder}
          />
        </div>
      );
    }

    if (predicate.type === 'dropdown') {
      return (
        <div className="FilterPredicate__Value">
          <select value={value} onChange={this.handleChange}>
            <option key="__default" value="">
              Choose...
            </option>
            {predicate.choices.map(choice => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return <div className="FilterPredicate__Value">UNKNOWN INPUT</div>;
  }

  renderActions() {
    const { onDelete } = this.props;

    return (
      <div className="FilterPredicate__Actions">
        <i className="far fa-trash-alt" onClick={onDelete} />
      </div>
    );
  }
}
