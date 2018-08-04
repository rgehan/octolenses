import React from 'react';

import { fetchRepos } from '../../lib/github';
import { RepoCard } from '../../components/RepoCard';

import './Main.scss';

export class Main extends React.Component {
  state = {
    repos: [],
  };

  async componentWillMount() {
    const repos = await fetchRepos('javascript', '2018-07-01');
    this.setState({ repos });
  }

  render() {
    const { repos } = this.state;

    return (
      <div className="Main">
        <div className="Main__Header">
          <h1 className="Main__HeaderTitle">Github Trending</h1>
          <div className="Main__HeaderActions" />
        </div>
        <div className="Main__ReposList">
          {repos.map(repo => <RepoCard repo={repo} />)}
        </div>
      </div>
    );
  }
}
