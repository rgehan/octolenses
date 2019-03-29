import { pick } from 'lodash';
import { toJS } from 'mobx';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../../components/Modal';

import { inject } from 'mobx-react';
import { providers, ProviderType } from '../../providers';
import { Filter, FiltersStore } from '../../store/filters';
import { PredicatesStep } from './PredicatesStep';
import { ProviderStep } from './ProviderStep';

const Container = styled.div`
  width: 650px;
`;

enum STEPS {
  PROVIDERS,
  PREDICATES,
}

interface IProps {
  initialFilter?: Filter;
  onClose: () => void;
  filters: FiltersStore;
}

export const FilterEditModal = inject('filters')(
  ({ initialFilter, filters, onClose }: IProps) => {
    const [step, setStep] = useState(
      initialFilter ? STEPS.PREDICATES : STEPS.PROVIDERS
    );

    const defaultedFilter = defaultFilter(initialFilter);

    const [provider, setProvider] = useState(defaultedFilter.provider);
    const [label, setLabel] = useState(defaultedFilter.label);
    const [predicates, setPredicates] = useState(defaultedFilter.predicates);

    function handleSave() {
      filters.saveFilter({
        id: defaultedFilter.id,
        provider,
        label,
        predicates,
      });

      onClose();
    }

    return (
      <Modal onClose={onClose}>
        <Container className="mt-32 mx-auto">
          {step === STEPS.PROVIDERS && (
            <ProviderStep
              provider={provider}
              onChange={setProvider}
              previous={onClose}
              next={() => setStep(STEPS.PREDICATES)}
            />
          )}
          {step === STEPS.PREDICATES && (
            <PredicatesStep
              label={label}
              setLabel={setLabel}
              predicates={predicates}
              setPredicates={setPredicates}
              provider={providers[provider]}
              previous={onClose}
              next={handleSave}
            />
          )}
        </Container>
      </Modal>
    );
  }
);

function defaultFilter(filter?: Filter) {
  if (!filter) {
    return {
      id: undefined,
      provider: ProviderType.GITHUB,
      label: 'Unnamed filter',
      predicates: [],
    };
  }

  return pick(toJS(filter), ['id', 'provider', 'label', 'predicates']);
}
