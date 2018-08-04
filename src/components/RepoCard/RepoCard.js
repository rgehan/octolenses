import React from 'react';

import './RepoCard.scss';

export const RepoCard = ({ repo }) => {
  const { name, description, language, stargazers_count, html_url } = repo;

  return (
    <div className="RepoCard">
      <a className="RepoCard__Name" href={html_url} target="__blank">
        {name}
      </a>
      <div className="RepoCard__Description">{description}</div>
      <div className="RepoCard__Indicators">
        <div>
          <i className="fa fa-star" /> {stargazers_count}
        </div>
        <div>
          <i className="fa fa-code-branch" /> {stargazers_count}
        </div>
      </div>
    </div>
  );
};
