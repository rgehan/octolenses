import { capitalize, chain } from 'lodash';

import { Predicate, PredicateType } from '../../types';

enum JiraOperators {
  EQ = '=',
  NEQ = '!=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  IN = 'IN',
  NOT_IN = 'NOT IN',
  CONTAINS = '~',
  NOT_CONTAINS = '!~',
}

interface ISimplePredicatePayload {
  name: string;
  placeholder?: string;
  label?: string;
  categorical?: boolean;
  numerical?: boolean;
  textual?: boolean;
}

/**
 * Makes a simple text predicate
 * @param options Options configuring the predicate
 */
export const makePredicate = ({
  name,
  label,
  placeholder = '',
  categorical = true,
  numerical = false,
  textual = false,
}: ISimplePredicatePayload): Predicate => ({
  name,
  label: label || capitalize(name),
  placeholder,
  type: PredicateType.TEXT,
  operators: makeAvailableOperators(categorical, numerical, textual),
  serialize: ({ value, operator }) => `${name} ${operator} ${value}`,
});

const makeAvailableOperators = (
  categorical: boolean,
  numerical: boolean,
  textual: boolean
) =>
  chain([])
    .concat(
      numerical && [
        { value: JiraOperators.EQ, label: '=' },
        { value: JiraOperators.NEQ, label: '!=' },
        { value: JiraOperators.GT, label: '>' },
        { value: JiraOperators.GTE, label: '>=' },
        { value: JiraOperators.GTE, label: '<' },
        { value: JiraOperators.GTE, label: '<=' },
      ],
      categorical && [
        { value: JiraOperators.EQ, label: '=' },
        { value: JiraOperators.NEQ, label: '!=' },
        { value: JiraOperators.IN, label: 'IN' },
        { value: JiraOperators.NOT_IN, label: 'NOT IN' },
      ],
      textual && [
        { value: JiraOperators.CONTAINS, label: '~' },
        { value: JiraOperators.NOT_CONTAINS, label: '!~' },
      ]
    )
    .compact()
    .uniq()
    .value();

export const availablePredicates: Predicate[] = [
  makePredicate({ name: 'project', placeholder: 'MYPROJECT' }),
  makePredicate({ name: 'status', placeholder: 'open/closed' }),
  makePredicate({ name: 'resolution' }),
  makePredicate({ name: 'sprint' }),
  makePredicate({ name: 'assignee' }),
  makePredicate({ name: 'component' }),
  makePredicate({ name: 'created', numerical: true }),
  makePredicate({ name: 'creator', numerical: true }),
  makePredicate({ name: 'label' }),
  makePredicate({ name: 'level' }),
  makePredicate({ name: 'priority', numerical: true }),
  makePredicate({ name: 'reporter' }),
  makePredicate({ name: 'resolved', numerical: true }),
  makePredicate({ name: 'timeSpent', numerical: true }),
  makePredicate({ name: 'type' }),
  makePredicate({ name: 'updated', numerical: true }),
  makePredicate({ name: 'workRatio', label: 'Work Ratio', numerical: true }),
  makePredicate({ name: 'comment', categorical: false, textual: true }),
  makePredicate({ name: 'description', categorical: false, textual: true }),
  makePredicate({ name: 'summary', categorical: false, textual: true }),
  makePredicate({ name: 'text', categorical: false, textual: true }),
  makePredicate({
    name: 'issueKey',
    label: 'Issue Key',
    numerical: true,
  }),
  makePredicate({
    name: 'remainingEstimate',
    label: 'Remaining Estimate',
    numerical: true,
  }),
];
