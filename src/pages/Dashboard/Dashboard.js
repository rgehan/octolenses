import React from 'react';
import { connect } from 'react-redux';
import { get, find, isUndefined, findIndex, size, chain } from 'lodash';

import { IssueCard } from '../../components/IssueCard';
import { FilterLink } from '../../components/FilterLink';
import { FilterEditModal } from '../../components/FilterEditModal';
import { FilterDeleteModal } from '../../components/FilterDeleteModal';
import { Loader } from '../../components/Loader';

import './Dashboard.scss';
import ExtendableError from '../../../node_modules/es6-error';

@connect(
  ({ filters }) => ({ filters }),
  ({ filters }) => ({
    fetchFilter: filters.fetchFilter,
    removeFilter: filters.removeFilter,
    saveAndRefreshFilter: filters.saveAndRefreshFilter,
  })
)
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilterId: get(props, 'filters.0.id'),
      filterModal: { isOpen: false, mode: 'adding' },
      filterDeleteModal: { isOpen: false },
    };
  }

  handleFilterSelected = filterId => {
    this.setState({ selectedFilterId: filterId });
  };

  handleDeleteFilter = () => {
    const { filters } = this.props;
    const { selectedFilterId } = this.state;

    if (isUndefined(selectedFilterId) || size(filters) === 1) {
      return;
    }

    // Find the id of the filter just above
    const currentFilterIndex = findIndex(filters, { id: selectedFilterId });
    const newlySelectedFilterIndex =
      currentFilterIndex === filters.length - 1
        ? currentFilterIndex - 1
        : currentFilterIndex;

    const realIndex = chain(filters)
      .filter(({ id }) => id !== selectedFilterId)
      .get([newlySelectedFilterIndex, 'id'])
      .value();

    this.setState({
      selectedFilterId: realIndex,
    });

    this.props.removeFilter({ id: selectedFilterId });
    this.handleCloseFilterDeleteModal();
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
    this.props.saveAndRefreshFilter(filter);
  };

  handleOpenFilterDeleteModal = () => {
    this.setState({
      filterDeleteModal: {
        isOpen: true,
      }
    });
  };

  handleCloseFilterDeleteModal = () => {
    this.setState({
      filterDeleteModal: {
        isOpen: false,
      }
    });
  };

  getSelectedFilter() {
    const { filters } = this.props;
    const { selectedFilterId } = this.state;

    return find(filters, { id: selectedFilterId });
  }

  render() {
    const { filters } = this.props;
    const { selectedFilterId, filterModal, filterDeleteModal } = this.state;

    const selectedFilter = this.getSelectedFilter();

    return (
      <div className="Dashboard">
        <div className="Dashboard__Filters">
          {filters.map(filter => (
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
              onClick={this.handleOpenFilterDeleteModal}
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
        {filterDeleteModal.isOpen && (
          <FilterDeleteModal
            filterLabel={selectedFilter.label}
            onClose={this.handleCloseFilterDeleteModal}
            onConfirm={this.handleDeleteFilter}
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
