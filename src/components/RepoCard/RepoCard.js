import React from 'react';

import './RepoCard.scss';

export const RepoCard = ({ repo }) => {
  const { name, description, language, stargazers_count, html_url } = repo;

  return (
    <a className="RepoCard" href={html_url} target="__blank">
      <div className="RepoCard__Name">{name}</div>
      <div className="RepoCard__Description">{description}</div>
      <div className="RepoCard__Indicators">
        <div>
          <i className="fa fa-star" /> {stargazers_count}
        </div>
        <div>
          <i className="fa fa-code-branch" /> {stargazers_count}
        </div>
      </div>
    </a>
  );
};
