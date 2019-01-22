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
    language,
    owner: { avatar_url, html_url: profile_url },
  } = repo;

  return (
    <div className="w-1/3 pl-6 mb-6">
      <div className="bg-white h-64 flex flex-col px-5 py-4 shadow-xl rounded-lg text-black">
        <div className="flex items-center min-h-10">
          <a
            href={profile_url}
            className="inline-block h-8 w-8 overflow-hidden rounded-full mr-3"
          >
            <img src={avatar_url} />
          </a>
          <a
            className="min-w-0 truncate text-blue hover:text-blue-dark hover:underline text-2xl py-2"
            href={html_url}
            target="__blank"
          >
            {name}
          </a>
        </div>
        <div className="leading-normal mt-1 overflow-hidden">{description}</div>
        <div className="flex-1 min-h-6 flex items-end mt-2 text-grey-darker">
          {language && <div className="mr-5">{language}</div>}
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
      </div>
    </div>
  );
};
