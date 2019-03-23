export const fetchResources = async (token: string) => {
  const url = 'https://api.atlassian.com/oauth/token/accessible-resources';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
