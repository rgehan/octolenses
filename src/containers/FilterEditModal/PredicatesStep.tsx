import cx from 'classnames';
import { get } from 'lodash';
import React, { ChangeEvent, useContext } from 'react';

import { Button, ButtonType } from '../../components/Button';
import { FilterPredicate } from '../../components/FilterPredicate';
import { IsDarkContext } from '../../contexts/isDark';
import { AbstractProvider, StoredPredicate } from '../../providers';

interface IProps {
  label: string;
  predicates: any[]; // TODO
  provider: AbstractProvider;
  setLabel: (name: string) => void;
  setPredicates: (predicates: any[]) => void; // TODO
  previous: () => void;
  next: () => void;
}

export const PredicatesStep = ({
  label,
  predicates,
  provider,
  setLabel,
  setPredicates,
  previous,
  next,
}: IProps) => {
  const isDark = useContext(IsDarkContext);

  /**
   * Add a new predicate to the list of predicates
   */
  function handleAddPredicate(event: ChangeEvent<HTMLSelectElement>) {
    const predicate = provider.findPredicate(event.target.value);

    if (!predicate) {
      return;
    }

    setPredicates([
      ...predicates,
      {
        type: predicate.name,
        operator: get(predicate, 'operators.0.value'),
        value: '',
      },
    ]);
  }

  /**
   * Update a predicate in place
   * @param index Index at which the predicate is located
   */
  const handlePredicateChange = (index: number) => ({
    value,
    operator,
  }: StoredPredicate) => {
    setPredicates([
      ...predicates.slice(0, index),
      { ...predicates[index], value, operator },
      ...predicates.slice(index + 1),
    ]);
  };

  /**
   * Remove a predicate
   * @param index Index at which the predicate is located
   */
  const handlePredicateDeletion = (index: number) => () => {
    setPredicates([
      ...predicates.slice(0, index),
      ...predicates.slice(index + 1),
    ]);
  };

  return (
    <div>
      <div className="text-base text-grey font-medium tracking-wide">
        Filter name
      </div>
      <input
        type="text"
        value={label}
        className={cx(
          'w-full text-2xl bg-transparent outline-none',
          isDark && 'text-white'
        )}
        onChange={event => setLabel(event.target.value)}
      />
      <div className="text-base text-grey font-medium tracking-wide mt-8 mb-2">
        Predicates
      </div>
      <div>
        {predicates.map((predicate, index) => (
          <FilterPredicate
            key={index}
            {...predicate}
            provider={provider}
            onChange={handlePredicateChange(index)}
            onDelete={handlePredicateDeletion(index)}
          />
        ))}
      </div>
      <div>
        <select
          value=""
          onChange={handleAddPredicate}
          className={cx(
            'bg-transparent appearance-none border-none outline-none cursor-pointer',
            isDark ? 'text-grey' : 'text-black'
          )}
        >
          <option key="__default" value="">
            + Add a predicate
          </option>
          {provider.getAvailablePredicates().map(({ name, label }) => (
            <option key={name} value={name}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mt-10">
        <Button onClick={previous} className="mr-3">
          Cancel
        </Button>
        <Button onClick={next} type={ButtonType.PRIMARY}>
          Continue
        </Button>
      </div>
    </div>
  );
};
