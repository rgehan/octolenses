import React from 'react';
import { connect } from 'react-redux';

import { fetchRepos } from '../../lib/github';
import { RepoCard, Loader, Dropdown } from '../../components';
import { DATES, getDateFromValue } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';

import './Discover.scss';

@connect(
  ({ settings }) => ({
    language: settings.language,
    dateRange: settings.dateRange,
  }),
  ({ settings }) => ({ updateSettings: settings.updateSettings })
)
export class Discover extends React.Component {
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

  handleOptionChange = ({ name, value }) => {
    this.props.updateSettings({ key: name, value });
  };

  render() {
    const { language, dateRange, updateSettings } = this.props;
    const { repos, loading } = this.state;

    return (
      <div className="Discover">
        <div className="Discover__Actions">
          <Dropdown
            name="language"
            items={LANGUAGES}
            value={language}
            onChange={this.handleOptionChange}
          />
          <Dropdown
            name="dateRange"
            items={DATES}
            value={dateRange}
            onChange={this.handleOptionChange}
          />
        </div>
        <div className="Discover__ReposList">
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
