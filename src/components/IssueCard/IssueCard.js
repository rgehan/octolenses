import React from 'React';
import { chain } from 'lodash';
import cx from 'classnames';

import { LabelBadge } from '../LabelBadge';

import './IssueCard.scss';

const parseRepoName = url =>
  chain(url)
    .split('/')
    .slice(-2)
    .join('/')
    .value();

export const IssueCard = ({ issue }) => {
  const isPR = issue.pull_request;
  const isOpen = issue.state === 'open';

  const fullRepoName = parseRepoName(issue.repository_url);

  return (
    <div className="IssueCard">
      <a className="IssueCard__Title" href={issue.html_url}>
        <i
          className={cx(
            'IssueCard__TitleIcon',
            'fas',
            isPR ? 'fa-code-branch' : 'fa-exclamation-circle',
            isOpen
              ? 'IssueCard__TitleIcon--open'
              : 'IssueCard__TitleIcon--closed'
          )}
        />
        <span className="IssueCard__TitleRepo">{fullRepoName}</span>
        <span className="IssueCard__TitleIssue">{issue.title}</span>
      </a>
      <div className="IssueCard__Labels">
        {issue.labels.map(label => <LabelBadge key={label.id} label={label} />)}
      </div>
    </div>
  );
};
