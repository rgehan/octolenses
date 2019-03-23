import { capitalize } from 'lodash';

import { Predicate, PredicateType } from '../../types';

interface SimplePredicatePayload {
  name: string;
  placeholder: string;
  label?: string;
}

/**
 * Makes a simple text predicate
 * @param options Options configuring the predicate
 */
export const makeSimplePredicate = ({
  name,
  label,
  placeholder,
}: SimplePredicatePayload): Predicate => ({
  name,
  label: label || capitalize(name),
  placeholder,
  type: PredicateType.TEXT,
  serialize: ({ value, negated }) => `${name} ${negated ? '!=' : '='} ${value}`,
});

export const availablePredicates: Predicate[] = [
  makeSimplePredicate({ name: 'project', placeholder: 'MYPROJECT' }),
  makeSimplePredicate({ name: 'status', placeholder: 'open/closed' }),
  makeSimplePredicate({ name: 'resolution', placeholder: '' }),
  makeSimplePredicate({ name: 'sprint', placeholder: '' }),
  makeSimplePredicate({ name: 'assignee', placeholder: '' }),
];
