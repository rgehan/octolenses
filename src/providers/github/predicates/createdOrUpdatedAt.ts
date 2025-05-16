import moment from 'moment';
import { IDropdownPredicate, PredicateType } from '../../types';

enum Preset {
  ONE_HOUR_AGO = 'one_hour_ago',
  ONE_DAY_AGO = 'one_day_ago',
  ONE_WEEK_AGO = 'one_week_ago',
  ONE_MONTH_AGO = 'one_month_ago',
}

enum Operator {
  MORE_THAN = 'more_than',
  LESS_THAN = 'less_than',
}

function makeDatePredicate(name: string, label: string, githubField: string): IDropdownPredicate {
  return {
    name,
    label,
    type: PredicateType.DROPDOWN,
    operators: [
      { value: Operator.MORE_THAN, label: 'More than' },
      { value: Operator.LESS_THAN, label: 'Less than' },
    ],
    choices: [
      { value: Preset.ONE_HOUR_AGO, label: '1 hour ago' },
      { value: Preset.ONE_DAY_AGO, label: '1 day ago' },
      { value: Preset.ONE_WEEK_AGO, label: '1 week ago' },
      { value: Preset.ONE_MONTH_AGO, label: '1 month ago' },
    ],
    serialize: ({ value, operator }) => {
      let date = null;
      switch (value) {
        // Less than
        case Preset.ONE_HOUR_AGO:
          date = moment().subtract(1, 'hour');
          break;
        case Preset.ONE_DAY_AGO:
          date = moment().subtract(1, 'day');
          break;
        case Preset.ONE_WEEK_AGO:
          date = moment().subtract(1, 'week');
          break;
        case Preset.ONE_MONTH_AGO:
          date = moment().subtract(1, 'month');
          break;
      }

      let operatorSymbol = null;
      switch (operator) {
        case Operator.LESS_THAN:
          operatorSymbol = '>';
          break;
        case Operator.MORE_THAN:
          operatorSymbol = '<';
          break;
      }

      if (date === null || operator === null)
        return null;

      return `${githubField}:${operatorSymbol}${date.format('YYYY-MM-DD')}`;
    },
  };
}

export const createdAt: IDropdownPredicate = makeDatePredicate('created at', 'Created At', 'created');
export const updatedAt: IDropdownPredicate = makeDatePredicate('updated at', 'Updated At', 'updated');