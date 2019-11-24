import { get, map } from 'lodash';

import { IssueStatus } from '../../components/IssueCard/types';

export const COMMIT_STATUS_TO_STATUS: Record<any, IssueStatus> = {
  EXPECTED: IssueStatus.UNKNOWN,
  ERROR: IssueStatus.FAILURE,
  FAILURE: IssueStatus.FAILURE,
  PENDING: IssueStatus.PENDING,
  SUCCESS: IssueStatus.SUCCESS,
};

export const CHECK_CONCLUSION_TO_STATUS: Record<any, IssueStatus> = {
  ACTION_REQUIRED: IssueStatus.UNKNOWN,
  TIMED_OUT: IssueStatus.UNKNOWN,
  CANCELLED: IssueStatus.UNKNOWN,
  FAILURE: IssueStatus.FAILURE,
  SUCCESS: IssueStatus.SUCCESS,
  NEUTRAL: IssueStatus.UNKNOWN,
};

export function extractGraphqlStatus(issue: any) {
  const commitStatus = get(issue, 'commits.nodes.0.commit.status.state');
  const checkStatus = get(issue, 'commits.nodes.0.commit.checkSuites.nodes.0');

  // Old status API
  if (commitStatus) {
    return COMMIT_STATUS_TO_STATUS[commitStatus];
  }

  // New check status API
  if (checkStatus) {
    const { status, conclusion } = checkStatus;

    if (status !== 'COMPLETED') {
      return IssueStatus.PENDING;
    }

    return CHECK_CONCLUSION_TO_STATUS[conclusion];
  }

  return IssueStatus.UNKNOWN;
}

export function extractGraphqlLabels(issue: any) {
  return map(issue.labels.edges, 'node');
}

export function extractConflictStatus(issue: any) {
  return issue.mergeable === 'CONFLICTING';
}
