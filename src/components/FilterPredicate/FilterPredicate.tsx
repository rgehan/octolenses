import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { AbstractProvider } from '../../providers';

import { SettingsStore } from '../../store/settings';
import { OperatorSelector } from './OperatorSelector';
import { ValueSelector } from './ValueSelector';

const Wrapper = styled.div`
  .action-icon {
    display: none;
  }

  :hover {
    .action-icon {
      display: initial;
    }
  }
`;

interface IProps {
  type: string;
  operator: string;
  value: string;
  provider: AbstractProvider;
  onChange: (payload: object) => void;
  onDelete: () => void;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const FilterPredicate = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ type, operator, value, provider, onDelete, onChange, settingsStore }) => {
  const predicate = provider.findPredicate(type);

  const handleChange = (key: string) => (newValue: string) =>
    onChange({
      type,
      operator,
      value,
      [key]: newValue,
    });

  return (
    <Wrapper className="flex relative mb-3" data-id={`predicate-${type}`}>
      <div
        className={cx(
          'flex-1 flex items-stretch rounded overflow-hidden text-lg',
          settingsStore.isDark ? 'bg-gray-800' : 'bg-gray-200'
        )}
      >
        <div
          className={cx(
            'text-white py-2 px-3',
            settingsStore.isDark ? 'bg-gray-700' : 'bg-gray-600'
          )}
        >
          <span>{predicate.label}</span>
          <OperatorSelector
            predicate={predicate}
            value={operator}
            onChange={handleChange('operator')}
          />
        </div>
        <div className="flex-1 flex">
          <ValueSelector
            predicate={predicate}
            value={value}
            onChange={handleChange('value')}
          />
        </div>
      </div>
      <div
        className="absolute inset-y-0 flex items-center px-4"
        style={{ left: '100%' }}
      >
        <i
          className={cx(
            'action-icon far fa-trash-alt cursor-pointer text-gray-600',
            settingsStore.isDark ? 'hover:text-gray-500' : 'hover:text-gray-800'
          )}
          onClick={onDelete}
        />
      </div>
    </Wrapper>
  );
});
