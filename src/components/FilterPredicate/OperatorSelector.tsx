import React from 'react';

import { Predicate } from '../../providers';

interface IProps {
  predicate: Predicate;
  value: string;
  onChange: (value: string) => void;
}

export const OperatorSelector = ({ predicate, value, onChange }: IProps) => {
  if (predicate.operators.length === 0) {
    return null;
  }

  return (
    <select
      className="ml-2"
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      {predicate.operators.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
