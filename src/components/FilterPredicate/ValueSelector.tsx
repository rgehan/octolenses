import React from 'react';

import { Predicate, PredicateType } from '../../providers';

interface IProps {
  predicate: Predicate;
  value: string;
  onChange: (value: string) => void;
}

export const ValueSelector = ({ predicate, value, onChange }: IProps) => {
  if (predicate.type === PredicateType.TEXT) {
    return (
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={predicate.placeholder}
        className="h-full flex-1 bg-transparent text-grey-darkest outline-none pl-3"
      />
    );
  }

  if (predicate.type === PredicateType.DROPDOWN) {
    return (
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="h-full flex-1 bg-transparent text-grey-darkest outline-none ml-2 mr-3"
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
