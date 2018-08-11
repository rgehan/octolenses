import React from 'react';
import humanFormat from 'human-format';

import './RepoCard.scss';

export const RepoCard = ({ repo }) => {
  const {
    name,
    description,
    stargazers_count,
    forks_count,
    open_issues_count,
    html_url,
  } = repo;

  return (
    <div className="RepoCard">
      <a className="RepoCard__Name" href={html_url} target="__blank">
        {name}
      </a>
      <div className="RepoCard__Description">{description}</div>
      <div className="RepoCard__Indicators">
        <div>
          <i className="fa fa-star" />{' '}
          {humanFormat(stargazers_count, { decimals: 1, separator: '' })}
        </div>
        <div>
          <i className="fa fa-code-branch" />{' '}
          {humanFormat(forks_count, { decimals: 1, separator: '' })}
        </div>
        <div>
          <i className="fa fa-exclamation-circle" />{' '}
          {humanFormat(open_issues_count, { decimals: 1, separator: '' })}
        </div>
      </div>
    </div>
  );
};
