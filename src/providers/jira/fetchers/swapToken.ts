export interface ISwapResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const swapToken = async (
  authCode: string,
  redirectUri: string
): Promise<ISwapResult> => {
  const url = 'https://octolenses.now.sh/api/swap';

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
