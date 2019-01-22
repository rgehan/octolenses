import React from 'react';
import { chain } from 'lodash';
import cx from 'classnames';
import timeago from 'timeago.js';

import { LabelBadge } from '../../components/LabelBadge';

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
    <div className="p-6 flex">
      <div className="flex items-center justify-center flex-no-shrink pr-4">
        <img
          className="w-16 h-16 rounded-full bg-grey-light overflow-hidden"
          src={issue.user.avatar_url}
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-start">
          <div className="flex-1 flex items-center mb-1 min-w-0">
            <i
              className={cx(
                'mr-2',
                isPR ? 'fas fa-code-branch' : 'fas fa-exclamation-circle',
                isOpen ? 'text-green' : 'text-red'
              )}
            />
            <span className="text-blue truncate pb-1 min-w-0">
              <a
                className="text-blue hover:text-blue-dark hover:underline"
                href={repoUrl}
              >
                {fullRepoName}
              </a>
              <span className="mx-1">•</span>
              <a
                className="text-lg text-blue hover:text-blue-dark hover:underline"
                href={issue.html_url}
                title={issue.title}
              >
                {issue.title}
              </a>
            </span>
          </div>
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
    </div>
  );
};
