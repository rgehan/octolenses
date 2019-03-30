import cx from 'classnames';
import React, { useContext } from 'react';

import { IsDarkContext } from '../../contexts/isDark';
import { Predicate, PredicateType } from '../../providers';

interface IProps {
  predicate: Predicate;
  value: string;
  onChange: (value: string) => void;
}

export const ValueSelector = ({ predicate, value, onChange }: IProps) => {
  const isDark = useContext(IsDarkContext);

  const baseStyle = cx(
    'h-full flex-1 bg-transparent outline-none',
    isDark ? 'text-white' : 'text-grey-darkest'
  );

  if (predicate.type === PredicateType.TEXT) {
    return (
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={predicate.placeholder}
        className={cx(baseStyle, 'pl-3')}
      />
    );
  }

  if (predicate.type === PredicateType.DROPDOWN) {
    return (
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className={cx(baseStyle, 'ml-2 mr-3')}
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
};
