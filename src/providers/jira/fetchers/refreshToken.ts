interface IRefreshResult {
  access_token: string;
  expires_in: number;
}

export const refreshToken = async (
  refreshToken: string
): Promise<IRefreshResult> => {
  const url = 'https://octolenses.now.sh/api/refresh';

  const { data } = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  }).then(res => res.json());

  return data;
};
