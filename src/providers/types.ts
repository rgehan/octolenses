export enum ProviderType {
  GITHUB = 'github',
  JIRA = 'jira',
}

type PredicateIdentifier = string;

// Template predicate, as returned by providers
interface BasePredicate {
  type: PredicateType;
  name: PredicateIdentifier;
  label: string;
  negatable?: boolean;
  serialize?: (payload: { value: string; negated?: boolean }) => string;
}

// A simple text predicate
interface TextPredicate extends BasePredicate {
  type: PredicateType.TEXT;
  placeholder: string;
}

// A dropdown predicate, allowing to pick from multiple choices
export interface DropdownPredicate extends BasePredicate {
  type: PredicateType.DROPDOWN;
  choices: Array<{ value: string; label: string }>;
}

export type Predicate = TextPredicate | DropdownPredicate;

// A predicate once it's been stored and configured
export interface StoredPredicate {
  type: PredicateIdentifier;
  value: string;
  negated?: boolean;
}

export enum PredicateType {
  TEXT = 'text',
  DROPDOWN = 'dropdown',
}
