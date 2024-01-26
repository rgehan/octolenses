export enum ProviderType {
  GITHUB = 'github',
  JIRA = 'jira',
}

type PredicateIdentifier = string;

// Template predicate, as returned by providers
interface IBasePredicate {
  type: PredicateType;
  name: PredicateIdentifier;
  label: string;
  operators: IPredicateOperator[];
  serialize?: (payload: { value: string; operator?: string }) => string;
}

// A simple text predicate
interface ITextPredicate extends IBasePredicate {
  type: PredicateType.TEXT;
  placeholder: string;
}

// A dropdown predicate, allowing to pick from multiple choices
export interface IDropdownPredicate extends IBasePredicate {
  type: PredicateType.DROPDOWN;
  choices: Array<{ value: string; label: string }>;
}

export type Predicate = ITextPredicate | IDropdownPredicate;

// A predicate once it's been stored and configured
export interface IStoredPredicate {
  type: PredicateIdentifier;
  value: string;
  operator?: string;
}

export enum PredicateType {
  TEXT = 'text',
  DROPDOWN = 'dropdown',
}

interface IPredicateOperator {
  value: string;
  label: string;
}
