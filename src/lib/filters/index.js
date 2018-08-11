import { find } from 'lodash';

import { type } from './type';
import { repository } from './repository';
import { label } from './label';
import { author } from './author';
import { status } from './status';

const PREDICATES = [type, repository, label, author, status];

export const findPredicate = type => find(PREDICATES, { name: type });

export const serializePredicatePayload = ({ type, ...payload }) => {
  const predicate = findPredicate(type);
  return predicate.serialize(payload);
};
