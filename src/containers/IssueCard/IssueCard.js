import React from 'react';
import { chain } from 'lodash';
import cx from 'classnames';
import timeago from 'timeago.js';

import { LabelBadge } from '../../components/LabelBadge';

import './IssueCard.scss';

const parseRepoName = url =>
  chain(url)
    .split('/')
    .slice(-2)
    .join('/')
    .value();

const parseRepoUrl = apiUrl =>
  apiUrl.replace('api.github.com/repos/', 'github.com/');

export const IssueCard = ({ issue }) => {
  const isPR = issue.pull_request;
  const isOpen = issue.state === 'open';

  const fullRepoName = parseRepoName(issue.repository_url);
  const repoUrl = parseRepoUrl(issue.repository_url);

  return (
    <div className="p-6">
      <div className="flex items-start">
        <div className="flex-1 flex mb-1 min-w-0">
          <i
            className={cx(
              'mr-2',
              isPR ? 'fas fa-code-branch' : 'fas fa-exclamation-circle',
              isOpen ? 'text-green' : 'text-red'
            )}
          />
          <a className="text-blue text-lg mr-2 hover:underline" href={repoUrl}>
            {fullRepoName}
          </a>
          <a
            className="text-blue text-lg pb-1 truncate hover:underline"
            href={issue.html_url}
          >
            {issue.title}
          </a>
        </div>
        <a
          href={issue.html_url}
          className="flex items-center ml-2 cursor-pointer text-grey-dark hover:text-grey-darker"
        >
          {issue.comments}
          <i className="far fa-comment-alt ml-2" />
        </a>
      </div>
      <div className="text-grey-darker text-xs">
        {timeago().format(issue.created_at)} by{' '}
        <a
          href={issue.user.html_url}
          className="text-grey-darker no-underline hover:underline"
        >
          {issue.user.login}
        </a>
      </div>
      <div className="flex mt-3">
        {issue.labels.map(label => (
          <LabelBadge key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};
