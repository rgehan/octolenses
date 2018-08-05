import React from 'react';

import { fetchRepos } from '../../lib/github';
import { withStorage, storeData } from '../../lib/storage';
import { RepoCard, Dropdown, Loader } from '../../components';
import { LANGUAGES } from '../../constants/languages';
import { DATES, getDateFromValue } from '../../constants/dates';

import './Main.scss';

const STORAGE_PREFIX = 'github-trending.options';

@withStorage({
  language: `${STORAGE_PREFIX}.language`,
  dateRange: `${STORAGE_PREFIX}.dateRange`,
})
export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      options: {
        language: props.language || LANGUAGES[0].value,
        dateRange: props.dateRange || DATES[0].value,
      },
      loading: false,
    };
  }

  async componentDidMount() {
    await this.refresh();
  }

  async componentDidUpdate(_, prevState) {
    const { language, dateRange } = this.state.options;
    const {
      language: prevLanguage,
      dateRange: prevDateRange,
    } = prevState.options;

    if (language !== prevLanguage || dateRange !== prevDateRange) {
      await this.refresh();
    }
  }

  async refresh() {
    const { language, dateRange } = this.state.options;

    this.setState({ loading: true });

    const date = getDateFromValue(dateRange);
    const repos = await fetchRepos(language, date);

    this.setState({ repos, loading: false });
  }

  handleOptionChange = ({ name, value }) => {
    this.setState({
      options: {
        ...this.state.options,
        [name]: value,
      },
    });

    storeData(`${STORAGE_PREFIX}.${name}`, value);
  };

  render() {
    const {
      repos,
      loading,
      options: { language, dateRange },
    } = this.state;

    return (
      <div className="Main">
        <div className="Main__Header">
          <h1 className="Main__HeaderTitle">Github Trending</h1>
          <div className="Main__HeaderActions">
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
        </div>
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
