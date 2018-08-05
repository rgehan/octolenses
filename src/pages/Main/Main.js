import React from 'react';

import { fetchRepos } from '../../lib/github';
import { withStorage, storeData } from '../../lib/storage';
import { RepoCard, Dropdown, Loader } from '../../components';
import { LANGUAGES } from '../../constants/languages';
import { DATES } from '../../constants/dates';

import './Main.scss';

const STORAGE_PREFIX = 'github-trending.options';

@withStorage({
  language: `${STORAGE_PREFIX}.language`,
  date: `${STORAGE_PREFIX}.date`,
})
export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      options: {
        language: props.language || LANGUAGES[0].value,
        date: props.date || DATES[0].value,
      },
      loading: false,
    };
  }

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

    storeData(`${STORAGE_PREFIX}.${name}`, value);
  };

  render() {
    const {
      repos,
      loading,
      options: { language, date },
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
              name="date"
              items={DATES}
              value={date}
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
