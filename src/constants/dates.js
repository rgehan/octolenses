import moment from 'moment';

/**
 * Computes a formatted date as used in a Github filter from
 * an amount of time and its corresponding unit
 * @param {*} amount
 * @param {*} unit
 */
const getDateFrom = (amount, unit) =>
  moment()
    .subtract(amount, unit)
    .format('YYYY-MM-DD');

export const DATES_FROM = [
  { name: 'Last week', value: getDateFrom(1, 'week') },
  { name: 'Last month', value: getDateFrom(1, 'month') },
  { name: 'Last 6 months', value: getDateFrom(6, 'months') },
  { name: 'Last year', value: getDateFrom(1, 'year') },
  { name: 'Anytime', value: '1970-01-01' },
];
