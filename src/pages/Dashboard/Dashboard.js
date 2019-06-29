import React from 'react';
import { inject, observer } from 'mobx-react';
import { find, isUndefined, findIndex, size, chain, get } from 'lodash';
import ExtendableError from 'es6-error';
import cx from 'classnames';
import { SortableContainer } from 'react-sortable-hoc';
import { computed } from 'mobx';

import { FilterEditModal } from '../../containers';
import { FilterLink, Loader } from '../../components';
import { providers } from '../../providers';

const FilterLinkContainer = SortableContainer(
  ({ links, selectedFilterId, onFilterSelected, dark = false }) => (
    <div>
      {links.map((link, index) => (
        <FilterLink
          key={link.id}
          index={index}
          filter={link}
          isSelected={link.id === selectedFilterId}
          onClick={() => onFilterSelected(link.id)}
          dark={dark}
        />
      ))}
    </div>
  )
);

@inject('filters', 'settings')
@observer
export class Dashboard extends React.Component {
  state = {
    filterModal: { isOpen: false, mode: 'adding' },
  };

  @computed
  get selectedFilter() {
    const { settings, filters } = this.props;
    const filter = find(filters.data, { id: settings.selectedFilterId });
    const firstFilter = find(filters.data, { id: filters.firstFilterId });
    return filter || firstFilter;
  }

  handleFilterSelected = filterId => {
    const { settings } = this.props;
    settings.selectedFilterId = filterId;
  };

  handleCloneFilter = () => {
    const { filters } = this.props;
    const { id } = filters.cloneFilter(this.selectedFilter.id);
    this.handleFilterSelected(id);
  };

  handleRefreshFilter = () => {
    this.selectedFilter.invalidateCache();
    this.props.filters.fetchFilter(this.selectedFilter);
  };

  handleDeleteFilter = () => {
    const { filters, settings } = this.props;

    if (!this.selectedFilter || filters.count === 1) {
      return;
    }

    // Find out the index (in the list) of the filter
    const currentFilterIndex = findIndex(filters.data, {
      id: this.selectedFilter.id,
    });

    // Find out which filter we'll have to select once removed
    const isDeletingLastFilter = currentFilterIndex === filters.count - 1;
    const newlySelectedFilterIndex = isDeletingLastFilter
      ? currentFilterIndex - 1
      : currentFilterIndex;

    // Find the actual UUID of the filter
    const realIndex = chain(filters.data)
      .filter(({ id }) => id !== this.selectedFilter.id)
      .get([newlySelectedFilterIndex, 'id'])
      .value();

    // Remove the filter, then select the next one
    filters.removeFilter(this.selectedFilter.id);
    settings.selectedFilterId = realIndex;
  };

  /*
   * Modal logic
   */

  handleOpenFilterModal = mode => () => {
    this.setState({
      filterModal: {
        isOpen: true,
        mode,
      },
    });
  };

  handleCloseFilterModal = () => {
    this.setState({
      filterModal: {
        isOpen: false,
      },
    });
  };

  handleSaveFilterModal = filter => {
    this.handleCloseFilterModal();
    this.props.filters.saveFilter(filter);
  };

  reorderFilters = ({ oldIndex, newIndex }) => {
    const { filters } = this.props;

    // Do nothing if the user cancelled the drag
    if (oldIndex === newIndex) {
      return;
    }

    // Select the filter we want to move...
    this.handleFilterSelected(filters.data[oldIndex].id);

    // ...and move it
    filters.swapFilters(oldIndex, newIndex);
  };

  render() {
    const { filters, settings } = this.props;
    const { filterModal } = this.state;

    const LINKS = [
      {
        handler: this.handleOpenFilterModal('adding'),
        text: 'Add',
        icon: 'far fa-plus-square',
      },
      {
        handler: this.handleOpenFilterModal('editing'),
        text: 'Edit',
        icon: 'far fa-edit',
      },
      {
        handler: this.handleCloneFilter,
        text: 'Clone',
        icon: 'far fa-clone',
      },
      {
        handler: this.handleRefreshFilter,
        text: 'Refresh',
        icon: 'fas fa-sync-alt',
      },
      {
        handler: this.handleDeleteFilter,
        text: 'Delete',
        icon: 'far fa-trash-alt',
      },
    ];

    return (
      <div className="flex items-start w-full h-full pt-16">
        <div className="flex flex-col w-48 sticky top-4">
          <FilterLinkContainer
            links={filters.data}
            selectedFilterId={get(this.selectedFilter, 'id')}
            onFilterSelected={this.handleFilterSelected}
            dark={settings.isDark}
            onSortEnd={this.reorderFilters}
            lockAxis="y"
            lockToContainerEdges
            useDragHandle
          />
          <div className="flex flex-col items-end pr-5 mt-10">
            {LINKS.map(({ handler, text, icon }) => (
              <div
                onClick={handler}
                key={text}
                className={cx(
                  'mb-3 cursor-pointer select-none text-gray-600',
                  settings.isDark
                    ? 'hover:text-gray-500'
                    : 'hover:text-gray-900'
                )}
              >
                {text} <i className={cx(icon, 'ml-1 w-6 opacity-75')} />
              </div>
            ))}
          </div>
        </div>
        <div
          className={cx(
            'flex-1 flex flex-col shadow-xl rounded-lg mb-16 min-w-0',
            settings.isDark ? 'bg-gray-800 text-white' : 'bg-white'
          )}
        >
          {this.renderResults()}
        </div>
        {filterModal.isOpen && (
          <FilterEditModal
            initialFilter={
              filterModal.mode === 'editing' ? this.selectedFilter : null
            }
            onClose={this.handleCloseFilterModal}
            onSave={this.handleSaveFilterModal}
          />
        )}
      </div>
    );
  }

  renderResults() {
    if (!this.selectedFilter) {
      return null;
    }

    if (this.selectedFilter.loading) {
      return <Loader size={50} className="my-10" />;
    }

    if (this.selectedFilter.error) {
      const errorMessage =
        this.selectedFilter.error instanceof ExtendableError
          ? this.selectedFilter.error.message
          : 'Something failed, sorry.';

      return (
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-gray">
          <i className="fas fa-exclamation-triangle mr-2" />
          {errorMessage}
        </div>
      );
    }

    if (size(this.selectedFilter.data) === 0) {
      return (
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-gray">
          <i className="fa fa-search mr-2" />
          No results.
        </div>
      );
    }

    const CardComponent = providers[this.selectedFilter.provider].cardComponent;

    return this.selectedFilter.data.map((itemData, index) => (
      <CardComponent
        key={index}
        data={itemData}
        isNew={this.selectedFilter.isItemNew(itemData)}
      />
    ));
  }
}
