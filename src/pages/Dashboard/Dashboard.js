import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';

import { IssueCard } from '../../components/IssueCard';
import { FilterLink } from '../../components/FilterLink';

import './Dashboard.scss';

@connect(
  ({ filters }) => ({ filters }),
  ({ filters }) => ({ fetchFilter: filters.fetchFilter })
)
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilterId: get(props, 'filters.0.id')
    };
  }

  handleFilterSelected = filterId => {
    this.setState({ selectedFilterId: filterId });
    this.props.fetchFilter({ filterId });
  };

  getSelectedFilter() {
    const { filters } = this.props;
    const { selectedFilterId } = this.state;

    return find(filters, { id: selectedFilterId });
  }

  render() {
    const { filters } = this.props;
    const selectedFilter = this.getSelectedFilter();

    return (
      <div className="Dashboard">
        <div className="Dashboard__Filters">
          {filters.map(filter => (
            <FilterLink
              key={filter.id}
              filter={filter}
              isSelected={filter.id === selectedFilter.id}
              onClick={() => this.handleFilterSelected(filter.id)}
            />
          ))}
        </div>
        <div className="Dashboard__Results">
          {selectedFilter &&
            selectedFilter.data.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
      </div>
    );
  }
}
