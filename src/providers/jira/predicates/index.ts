import { capitalize } from 'lodash';

import { Predicate, PredicateType } from '../../types';

interface SimplePredicatePayload {
  name: string;
  placeholder: string;
  label?: string;
}

enum JiraOperators {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  IN = 'IN',
  NOT_IN = 'NOT IN',
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
  operators: [
    { value: JiraOperators.EQUAL, label: '=' },
    { value: JiraOperators.NOT_EQUAL, label: '!=' },
    { value: JiraOperators.IN, label: 'IN' },
    { value: JiraOperators.NOT_IN, label: 'NOT IN' },
  ],
  serialize: ({ value, operator }) => `${name} ${operator} ${value}`,
});

export const availablePredicates: Predicate[] = [
  makeSimplePredicate({ name: 'project', placeholder: 'MYPROJECT' }),
  makeSimplePredicate({ name: 'status', placeholder: 'open/closed' }),
  makeSimplePredicate({ name: 'resolution', placeholder: '' }),
  makeSimplePredicate({ name: 'sprint', placeholder: '' }),
  makeSimplePredicate({ name: 'assignee', placeholder: '' }),
];
