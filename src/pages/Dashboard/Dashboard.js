import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import cx from 'classnames';

import { IssueCard } from '../../components/IssueCard';

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
            <div
              key={filter.id}
              className={cx(
                'Dashboard__FiltersItem',
                filter.id === selectedFilter.id &&
                  'Dashboard__FiltersItem--selected'
              )}
              onClick={() => this.handleFilterSelected(filter.id)}
            >
              {filter.label}
            </div>
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
