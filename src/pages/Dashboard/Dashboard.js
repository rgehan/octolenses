import React from 'react';
import { inject, observer } from 'mobx-react';
import { find, isUndefined, findIndex, size, chain } from 'lodash';
import ExtendableError from 'es6-error';
import cx from 'classnames';

import { IssueCard, FilterEditModal } from '../../containers';
import { FilterLink, Loader } from '../../components';

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
          {filters.data.map(filter => (
            <FilterLink
              key={filter.id}
              filter={filter}
              isSelected={filter.id === selectedFilterId}
              onClick={() => this.handleFilterSelected(filter.id)}
            />
          ))}
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
            'flex-1 flex flex-col shadow-xl rounded-lg overflow-hidden mb-16',
            settings.isDark ? 'bg-grey-darkest text-white' : 'bg-white'
          )}
        >
          {this.renderResults()}
        </div>
        {filterModal.isOpen && (
          <FilterEditModal
            filter={filterModal.mode === 'editing' ? selectedFilter : null}
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

    return selectedFilter.data.map(issue => (
      <IssueCard key={issue.id} issue={issue} />
    ));
  }
}
