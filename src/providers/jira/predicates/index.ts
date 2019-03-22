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
