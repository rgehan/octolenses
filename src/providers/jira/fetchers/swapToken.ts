export interface SwapResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const swapToken = async (
  authCode: string,
  redirectUri: string
): Promise<SwapResult> => {
  const url = 'https://octolenses-jira-auth.now.sh/api/swap';

  const { data } = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      redirect_uri: redirectUri,
    }),
  }).then(res => res.json());

  return data;
};
