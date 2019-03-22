import React from 'react';
import { inject, observer } from 'mobx-react';
import { find, isUndefined, findIndex, size, chain } from 'lodash';
import ExtendableError from 'es6-error';
import cx from 'classnames';
import { SortableContainer } from 'react-sortable-hoc';

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
    selectedFilterId: null,
    filterModal: { isOpen: false, mode: 'adding' },
  };

  static getDerivedStateFromProps(props, state) {
    const { selectedFilterId } = state;
    const { filters } = props;

    // If no filter is selected, but there are filters available,
    // select the first one
    if (selectedFilterId === null && filters.count > 0) {
      return {
        selectedFilterId: filters.firstFilterId,
      };
    }

    return null;
  }

  handleFilterSelected = filterId => {
    this.setState({ selectedFilterId: filterId });
  };

  handleCloneFilter = () => {
    const filter = this.getSelectedFilter();
    const { id } = this.props.filters.cloneFilter(filter.id);
    this.handleFilterSelected(id);
  };

  handleRefreshFilter = () => {
    const filter = this.getSelectedFilter();
    this.props.filters.fetchFilter(filter);
  };

  handleDeleteFilter = () => {
    const { filters } = this.props;
    const { selectedFilterId } = this.state;

    if (isUndefined(selectedFilterId) || filters.count === 1) {
      return;
    }

    // Find the id of the filter just above
    const currentFilterIndex = findIndex(filters.data, {
      id: selectedFilterId,
    });

    const newlySelectedFilterIndex =
      currentFilterIndex === filters.count - 1
        ? currentFilterIndex - 1
        : currentFilterIndex;

    const realIndex = chain(filters.data)
      .filter(({ id }) => id !== selectedFilterId)
      .get([newlySelectedFilterIndex, 'id'])
      .value();

    this.setState({
      selectedFilterId: realIndex,
    });

    this.props.filters.removeFilter(selectedFilterId);
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

  getSelectedFilter() {
    const { filters } = this.props;
    return find(filters.data, { id: this.state.selectedFilterId });
  }

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
    const { selectedFilterId, filterModal } = this.state;

    const selectedFilter = this.getSelectedFilter();

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
        <div className="flex flex-col w-48">
          <FilterLinkContainer
            links={filters.data}
            selectedFilterId={selectedFilterId}
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
                  'mb-3 cursor-pointer select-none text-grey-dark',
                  settings.isDark ? 'hover:text-grey' : 'hover:text-black'
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
            settings.isDark ? 'bg-grey-darkest text-white' : 'bg-white'
          )}
        >
          {this.renderResults()}
        </div>
        {filterModal.isOpen && (
          <FilterEditModal
            initialFilter={
              filterModal.mode === 'editing' ? selectedFilter : null
            }
            onClose={this.handleCloseFilterModal}
            onSave={this.handleSaveFilterModal}
          />
        )}
      </div>
    );
  }

  renderResults() {
    const selectedFilter = this.getSelectedFilter();

    if (!selectedFilter) {
      return null;
    }

    if (selectedFilter.loading) {
      return <Loader size={50} className="my-10" />;
    }

    if (selectedFilter.error) {
      const errorMessage =
        selectedFilter.error instanceof ExtendableError
          ? selectedFilter.error.message
          : 'Something failed, sorry.';

      return (
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-grey">
          <i className="fas fa-exclamation-triangle mr-2" />
          {errorMessage}
        </div>
      );
    }

    if (size(selectedFilter.data) === 0) {
      return (
        <div className="flex-1 flex items-center justify-center select-none text-2xl my-10 mx-0 text-grey">
          <i className="fa fa-search mr-2" />
          No results.
        </div>
      );
    }

    const CardComponent = providers[selectedFilter.provider].cardComponent;

    return selectedFilter.data.map((itemData, index) => (
      <CardComponent key={index} data={itemData} />
    ));
  }
}
