import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { Predicate, PredicateType } from '../../providers';
import { SettingsStore } from '../../store/settings';

interface IProps {
  predicate: Predicate;
  value: string;
  onChange: (value: string) => void;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const ValueSelector = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ predicate, value, onChange, settingsStore }) => {
  const baseStyle = cx(
    'h-full flex-1 bg-transparent outline-none',
    settingsStore.isDark ? 'text-white' : 'text-gray-800'
  );

  if (predicate.type === PredicateType.TEXT) {
    return (
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={predicate.placeholder}
        className={cx(baseStyle, 'pl-3')}
        data-id="predicate-value-selector"
      />
    );
  }

  if (predicate.type === PredicateType.DROPDOWN) {
    return (
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className={cx(baseStyle, 'ml-2 mr-3')}
        data-id="predicate-value-selector"
      >
        <option key="__default" value="">
          Choose...
        </option>
        {predicate.choices.map(choice => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    );
  }

  return null;
});
