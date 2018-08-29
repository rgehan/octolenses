import { includes } from 'lodash';

export const isNewTabUrl = url =>
  includes(['chrome://newtab/', 'about:newtab'], url);
