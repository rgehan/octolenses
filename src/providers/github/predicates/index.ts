import { capitalize } from 'lodash';

import { Predicate, PredicateType } from '../../types';

export { mergeStatus } from './mergeStatus';
export { review } from './review';
export { status } from './status';
export { type } from './type';

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
  serialize: ({ value, negated }) => `${negated ? '-' : ''}${name}:${value}`,
});
