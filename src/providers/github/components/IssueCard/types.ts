export enum IssueStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  UNKNOWN = 'UNKNOWN',
}

export enum TimelineItemType {
  ISSUE_COMMENT = 'IssueComment',
  PULL_REQUEST_COMMIT = 'PullRequestCommit',
  PULL_REQUEST_REVIEW = 'PullRequestReview',
}

export type TimelineItem =
  | IIssueComment
  | IPullRequestCommit
  | IPullRequestReview;

interface IIssueComment {
  __typename: TimelineItemType.ISSUE_COMMENT;
  createdAt: string;
}

interface IPullRequestCommit {
  __typename: TimelineItemType.PULL_REQUEST_COMMIT;
  commit: {
    committedDate: string;
  };
}

interface IPullRequestReview {
  __typename: TimelineItemType.PULL_REQUEST_REVIEW;
  createdAt: string;
}
