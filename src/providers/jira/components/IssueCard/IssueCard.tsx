import React, { useContext } from 'react';
import cx from 'classnames';
import timeago from 'timeago.js';

import { IsDarkContext } from '../../../../contexts/isDark';
import { StatusBadge } from './StatusBadge';

export interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    description: string;
    created: string;
    updated: string;
    issuetype: {
      name: string;
      iconUrl: string;
    };
    project: {
      name: string;
      key: string;
      avatarUrls: {
        '48x48': string;
      };
    };
    priority: {
      iconUrl: string;
      name: string;
    };
    assignee: {
      displayName: string;
      emailAddress: string;
      avatarUrls: {
        '48x48': string;
      };
    };
    status: {
      name: string;
      statusCategory: {
        colorName: string;
      };
    };
  };
}

interface IProps {
  data: JiraIssue;
}

export const IssueCard = ({ data: issue }: IProps) => {
  const isDark = useContext(IsDarkContext);

  // The API doesn't seem to return the URL to the actual issue on the web
  // interface, so we have to resort to a hack to generate it. It seems icons
  // are hosted on the same domain as the web interface. This is an assumption
  // that works in my use case, but that could fail in other cases. Feel free
  // to suggest a change if you ever encounter an issue with this.
  const origin = new URL(issue.fields.issuetype.iconUrl).origin;
  const url = `${origin}/browse/${issue.key}`;

  const linkStyle = isDark
    ? 'text-blue-light'
    : 'text-blue hover:text-blue-dark';

  return (
    <div className="p-6 flex">
      <div className="flex items-center justify-center flex-no-shrink pr-4">
        <div
          className={cx(
            'w-12 h-12 rounded-full overflow-hidden',
            isDark ? 'bg-grey-darker' : 'bg-grey-light'
          )}
        >
          {issue.fields.assignee && (
            <img src={issue.fields.assignee.avatarUrls['48x48']} />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex-1 flex items-center mb-1 min-w-0">
            <img src={issue.fields.issuetype.iconUrl} className="mr-1 mb-1" />
            <span className={cx('truncate pb-1 min-w-0', linkStyle)}>
              <a
                className={cx('text-lg hover:underline', linkStyle)}
                href={url}
                title={issue.fields.summary}
              >
                {issue.fields.summary}
              </a>
            </span>
            <StatusBadge issue={issue} />
          </div>
        </div>
        <div
          className={cx('text-xs', isDark ? 'text-grey' : 'text-grey-darker')}
        >
          {issue.key} opened {timeago().format(issue.fields.created)}
        </div>
      </div>
    </div>
  );
};
