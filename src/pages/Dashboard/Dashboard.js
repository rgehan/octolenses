import React from 'react';
import { inject, observer } from 'mobx-react';
import { find, isUndefined, findIndex, size, chain } from 'lodash';

import { IssueCard } from '../../components/IssueCard';
import { FilterLink } from '../../components/FilterLink';
import { FilterEditModal } from '../../components/FilterEditModal';
import { Loader } from '../../components/Loader';

import './Dashboard.scss';
import ExtendableError from '../../../node_modules/es6-error';

@inject('filters')
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
    const { filters } = this.props;
    const { selectedFilterId, filterModal } = this.state;

    const selectedFilter = this.getSelectedFilter();

    return (
      <div className="Dashboard">
        <div className="Dashboard__Filters">
          {filters.data.map(filter => (
            <FilterLink
              key={filter.id}
              filter={filter}
              isSelected={filter.id === selectedFilterId}
              onClick={() => this.handleFilterSelected(filter.id)}
            />
          ))}
          <div className="Dashboard__Filters-Actions">
            <div
              onClick={this.handleOpenFilterModal('adding')}
              className="Dashboard__Filters-Actions-Edit"
            >
              Add filter
            </div>
            <div
              onClick={this.handleOpenFilterModal('editing')}
              className="Dashboard__Filters-Actions-Edit"
            >
              Edit filter
            </div>
            <div
              onClick={this.handleDeleteFilter}
              className="Dashboard__Filters-Actions-Delete"
            >
              Delete filter
            </div>
          </div>
        </div>
        <div className="Dashboard__Results">{this.renderResults()}</div>
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
      return <Loader size={50} />;
    }

    if (selectedFilter.error) {
      const errorMessage =
        selectedFilter.error instanceof ExtendableError
          ? selectedFilter.error.message
          : 'Something failed, sorry.';

      return (
        <div className="Dashboard__Results-NoResults">
          <i className="fas fa-exclamation-triangle" />
          {errorMessage}
        </div>
      );
    }

    if (size(selectedFilter.data) === 0) {
      return (
        <div className="Dashboard__Results-NoResults">
          <i className="fa fa-search" />
          No results.
        </div>
      );
    }

    return selectedFilter.data.map(issue => (
      <IssueCard key={issue.id} issue={issue} />
    ));
  }
}
