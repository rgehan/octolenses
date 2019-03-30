import cx from 'classnames';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { AbstractProvider } from '../../providers';

import { IsDarkContext } from '../../contexts/isDark';
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

export const FilterPredicate = ({
  type,
  operator,
  value,
  provider,
  onDelete,
  onChange,
}: IProps) => {
  const isDark = useContext(IsDarkContext);
  const predicate = provider.findPredicate(type);

  const handleChange = (key: string) => (newValue: string) =>
    onChange({
      type,
      operator,
      value,
      [key]: newValue,
    });

  return (
    <Wrapper className="flex relative mb-3">
      <div
        className={cx(
          'flex-1 flex items-stretch rounded overflow-hidden text-lg',
          isDark ? 'bg-grey-darkest' : 'bg-grey-lighter'
        )}
      >
        <div
          className={cx(
            'text-white py-2 px-3',
            isDark ? 'bg-grey-darker' : 'bg-grey-dark'
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
        className="absolute pin-y flex items-center px-4"
        style={{ left: '100%' }}
      >
        <i
          className={cx(
            'action-icon far fa-trash-alt cursor-pointer text-grey-dark',
            isDark ? 'hover:text-grey' : 'hover:text-grey-darkest'
          )}
          onClick={onDelete}
        />
      </div>
    </Wrapper>
  );
};
