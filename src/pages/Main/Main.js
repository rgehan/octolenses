import React from 'react';

import { fetchRepos } from '../../lib/github';
import { RepoCard, Dropdown, Loader } from '../../components';
import { LANGUAGES } from '../../constants/languages';
import { DATES } from '../../constants/dates';

import './Main.scss';

export class Main extends React.Component {
  state = {
    repos: [],
    options: {
      language: LANGUAGES[0].value,
      date: DATES[0].value,
    },
    loading: false,
  };

  async componentDidMount() {
    await this.refresh();
  }

  async componentDidUpdate(_, prevState) {
    const { language, date } = this.state.options;
    const { language: prevLanguage, date: prevDate } = prevState.options;

    if (language !== prevLanguage || date !== prevDate) {
      await this.refresh();
    }
  }

  async refresh() {
    const { language, date } = this.state.options;

    this.setState({ loading: true });

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
  };

  render() {
    const { repos, loading } = this.state;

    return (
      <div className="Main">
        <div className="Main__Header">
          <h1 className="Main__HeaderTitle">Github Trending</h1>
          <div className="Main__HeaderActions">
            <Dropdown
              name="language"
              items={LANGUAGES}
              onChange={this.handleOptionChange}
            />
            <Dropdown
              name="date"
              items={DATES}
              onChange={this.handleOptionChange}
            />
          </div>
        </div>
        <div className="Main__ReposList">
          {loading ? <Loader /> : repos.map(repo => <RepoCard repo={repo} />)}
        </div>
      </div>
    );
  }
}
