import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import { FilterLink } from '../../components';
import { Filter } from '../../store/filters';

interface IProps {
  links: Filter[];
  selectedFilterId: string;
  onFilterSelected: (id: string) => void;
}

export const FilterLinkContainer = SortableContainer<IProps>(
  ({ links, selectedFilterId, onFilterSelected }: IProps) => (
    <div data-id="filter-links">
      {links.map((link: Filter, index: number) => (
        <FilterLink
          key={link.id}
          index={index}
          filter={link}
          isSelected={link.id === selectedFilterId}
          onClick={() => onFilterSelected(link.id)}
        />
      ))}
    </div>
  )
);
