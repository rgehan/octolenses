import React from 'react';
import { connect } from 'react-redux';

import { fetchRepos } from '../../lib/github';
import { RepoCard, Loader } from '../../components';
import { getDateFromValue } from '../../constants/dates';

import './Main.scss';

@connect(({ settings }) => ({
  language: settings.language,
  dateRange: settings.dateRange,
}))
export class Main extends React.Component {
  state = {
    repos: [],
    loading: false,
  };

  async componentWillReceiveProps() {
    await this.refresh();
  }

  async componentDidMount() {
    await this.refresh();
  }

  async refresh() {
    const { language, dateRange } = this.props;

    this.setState({ loading: true });

    const date = getDateFromValue(dateRange);
    const repos = await fetchRepos(language, date);

    this.setState({ repos, loading: false });
  }

  render() {
    const { repos, loading } = this.state;

    return (
      <div className="Main">
        <div className="Main__ReposList">
          {loading ? (
            <Loader />
          ) : (
            repos.map(repo => <RepoCard key={repo.name} repo={repo} />)
          )}
        </div>
      </div>
    );
  }
}
