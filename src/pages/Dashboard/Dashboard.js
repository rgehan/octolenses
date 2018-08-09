import React from 'react';
import { connect } from 'react-redux';
import { get, find, isUndefined, findIndex, size } from 'lodash';

import { IssueCard } from '../../components/IssueCard';
import { FilterLink } from '../../components/FilterLink';
import { FilterEditModal } from '../../components/FilterEditModal';

import './Dashboard.scss';

@connect(
  ({ filters }) => ({ filters }),
  ({ filters }) => ({
    fetchFilter: filters.fetchFilter,
    removeFilter: filters.removeFilter,
    editAndRefreshFilter: filters.editAndRefreshFilter,
  })
)
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilterId: get(props, 'filters.0.id'),
      isEditingFilter: false
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
    const newlySelectedFilterIndex = Math.max(currentFilterIndex - 1, 0);

    // Select the filter above
    this.setState({
      selectedFilterId: filters[newlySelectedFilterIndex].id
    });

    this.props.removeFilter({ id: selectedFilterId });
  };

  handleEditFilter = () => {
    this.setState({ isEditingFilter: true });
  };

  handleCancelEdit = () => {
    this.setState({ isEditingFilter: false });
  };

  handleApplyEdit = newFilter => {
    this.setState({ isEditingFilter: false });
    this.props.editAndRefreshFilter(newFilter);
  };

  getSelectedFilter() {
    const { filters } = this.props;
    const { selectedFilterId } = this.state;

    return find(filters, { id: selectedFilterId });
  }

  render() {
    const { filters } = this.props;
    const { selectedFilterId, isEditingFilter } = this.state;

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
              onClick={this.handleEditFilter}
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
        <div className="Dashboard__Results">
          {selectedFilter &&
            selectedFilter.data.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
        {isEditingFilter && (
          <FilterEditModal
            filter={selectedFilter}
            onCancel={this.handleCancelEdit}
            onApply={this.handleApplyEdit}
          />
        )}
      </div>
    );
  }
}
