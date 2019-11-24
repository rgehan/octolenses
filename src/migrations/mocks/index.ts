/* eslint-disable @typescript-eslint/camelcase */

import v0 from './v0';
import v1 from './v1';
import v1_withoutToken from './v1-without-token';
import v2 from './v2';
import v2_withNegatedPredicates from './v2-with-negated-predicates';
import v3_withDefaultedOperators from './v3-with-defaulted-operators';

const allMocks: Record<string, object> = {
  v0,
  v1,
  v1_withoutToken,
  v2,
  v2_withNegatedPredicates,
  v3_withDefaultedOperators,
};

export default allMocks;
