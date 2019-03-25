export const swapToken = async (authCode: string, redirectUri: string) => {
  const url = 'https://octolenses-jira-auth.now.sh/api/swap';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      redirect_uri: redirectUri,
    }),
  });

  return await response.json();
};
