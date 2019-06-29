import cx from 'classnames';
import ExtendableError from 'es6-error';
import { get, size } from 'lodash';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { Loader } from '../../components';
import { FilterEditModal } from '../../containers';
import { providers } from '../../providers';
import { filtersStore, settingsStore } from '../../store';
import { Filter } from '../../store/filters';
import { FilterLinkContainer } from './FilterLinkContainer';

@observer
export class Dashboard extends React.Component {
  public state = {
    filterModal: { isOpen: false, mode: 'adding' },
  };

  @computed
  get selectedFilter() {
    const filter = filtersStore.findFilter(settingsStore.selectedFilterId);
    const firstFilter = filtersStore.getFirstFilter();
    return filter || firstFilter;
  }

  public handleFilterSelected = (filterId: string) => {
    settingsStore.selectedFilterId = filterId;
  };

  public handleCloneFilter = () => {
    const { id } = filtersStore.cloneFilter(this.selectedFilter.id);
    this.handleFilterSelected(id);
  };

  public handleRefreshFilter = () => {
    this.selectedFilter.invalidateCache();
    this.selectedFilter.fetchFilter();
  };

  public handleDeleteFilter = () => {
    if (!this.selectedFilter || filtersStore.count === 1) {
      return;
    }

    // Find out the index (in the list) of the filter
    const currentFilterIndex = filtersStore.findFilterIndex(
      this.selectedFilter.id
    );

    // Find out which filter we'll have to select once removed
    const isDeletingLastFilter = currentFilterIndex === filtersStore.count - 1;
    const newlySelectedFilterIndex = isDeletingLastFilter
      ? currentFilterIndex - 1
      : currentFilterIndex + 1;

    // Find the actual UUID of the filter
    const realIndex = filtersStore.getFilterAt(newlySelectedFilterIndex).id;

    // Remove the filter, then select the next one
    filtersStore.removeFilter(this.selectedFilter.id);
    settingsStore.selectedFilterId = realIndex;
  };

  /*
   * Modal logic
   */

  public handleOpenFilterModal = (mode: string) => () => {
    this.setState({
      filterModal: {
        isOpen: true,
        mode,
      },
    });
  };

  public handleCloseFilterModal = () => {
    this.setState({
      filterModal: {
        isOpen: false,
      },
    });
  };

  public handleSaveFilterModal = (filter: Filter) => {
    this.handleCloseFilterModal();
    filtersStore.saveFilter(filter);
  };

  public reorderFilters = ({ oldIndex, newIndex }: any) => {
    // Do nothing if the user cancelled the drag
    if (oldIndex === newIndex) {
      return;
    }

    // Select the filter we want to move...
    this.handleFilterSelected(filtersStore.getFilterAt(oldIndex).id);

    // ...and move it
    filtersStore.swapFilters(oldIndex, newIndex);
  };

  public render() {
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
            links={filtersStore.getFilters()}
            selectedFilterId={get(this.selectedFilter, 'id')}
            onFilterSelected={this.handleFilterSelected}
            dark={settingsStore.isDark}
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
                  settingsStore.isDark
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
            settingsStore.isDark ? 'bg-gray-800 text-white' : 'bg-white'
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
          />
        )}
      </div>
    );
  }

  public renderResults() {
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
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-gray-500">
          <i className="fas fa-exclamation-triangle mr-2" />
          {errorMessage}
        </div>
      );
    }

    if (size(this.selectedFilter.data) === 0) {
      return (
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-gray-500">
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
