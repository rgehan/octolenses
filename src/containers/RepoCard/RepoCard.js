import React from 'react';
import humanFormat from 'human-format';

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
    <div className="w-1/3 pl-6 mb-6">
      <a
        className="bg-white h-64 flex flex-col px-5 py-4 shadow-xl rounded-lg text-black"
        href={html_url}
        target="__blank"
      >
        <div className="text-blue text-2xl pb-2 truncate">{name}</div>
        <div className="leading-normal">{description}</div>
        <div className="flex-1 flex items-end mt-2 text-grey-darker">
          <div className="mr-5">
            <i className="fa fa-star" />{' '}
            {humanFormat(stargazers_count, { decimals: 1, separator: '' })}
          </div>
          <div className="mr-5">
            <i className="fa fa-code-branch" />{' '}
            {humanFormat(forks_count, { decimals: 1, separator: '' })}
          </div>
          <div>
            <i className="fa fa-exclamation-circle" />{' '}
            {humanFormat(open_issues_count, { decimals: 1, separator: '' })}
          </div>
        </div>
      </a>
    </div>
  );
};
