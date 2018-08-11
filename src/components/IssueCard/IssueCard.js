import React from 'react';
import { chain } from 'lodash';
import cx from 'classnames';
import timeago from 'timeago.js';

import { LabelBadge } from '../LabelBadge';

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
    <div className="IssueCard">
      <div className="IssueCard__Title">
        <i
          className={cx(
            'IssueCard__Title-Icon',
            'fas',
            isPR ? 'fa-code-branch' : 'fa-exclamation-circle',
            isOpen
              ? 'IssueCard__Title-Icon--open'
              : 'IssueCard__Title-Icon--closed'
          )}
        />
        <a className="IssueCard__Title-Repo" href={repoUrl}>
          {fullRepoName}
        </a>
        <a className="IssueCard__Title-Issue" href={issue.html_url}>
          {issue.title}
        </a>
      </div>
      <div className="IssueCard__Metadata">
        Opened {timeago().format(issue.created_at)} by{' '}
        <a href={issue.user.html_url} className="IssueCard__Metadata-Author">
          {issue.user.login}
        </a>
      </div>
      <div className="IssueCard__Labels">
        {issue.labels.map(label => (
          <LabelBadge key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};
