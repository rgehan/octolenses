const commonFields = `
  url
  title
  state
  number
  createdAt
  author {
    url
    login
    avatarUrl
  }
  labels(first: 10) {
    edges {
      node {
        name
        color
      }
    }
  }
  repository {
    nameWithOwner
    url
  }
`;

const issueFragment = `
  fragment IssueFragment on Issue {
    ${commonFields}
  }`;

const pullRequestFragment = `
  fragment PullRequestFragment on PullRequest {
    ${commonFields}
    commits(last: 1) {
      edges {
        node {
          commit {
            status {
              state
            }
          }
        }
      }
    }
  }`;

export const makeQuery = filterString => `
  ${pullRequestFragment}
  ${issueFragment}
  query results {
    search(query: "${filterString}", type: ISSUE, first: 100) {
      edges {
        node {
          __typename
          ... on PullRequest {
            ...PullRequestFragment
          }
          ... on Issue {
            ...IssueFragment
          }
        }
      }
    }
  }`;
