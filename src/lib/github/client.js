import { pickBy, get } from 'lodash';

import {
  InvalidCredentials,
  RateLimitError,
  NeedTokenError,
} from '../../errors';

export const githubClient = async ({
  endpoint,
  token,
  qs,
  body,
  method = 'GET',
}) => {
  const url = `https://api.github.com${endpoint}?${qs || ''}`;

  const response = await fetch(url, {
    body: method === 'POST' ? body : undefined,
    method,
    headers: pickBy({
      'User-Agent': 'OctoLenses Github Dashboard',
      Authorization: token && `Bearer ${token}`,
    }),
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return await response.json();
};

const handleErrorResponse = async response => {
  const status = response.status;
  const { message = '', errors = [] } = await response.json();

  const firstErrorMessage = get(errors, '0.message', '');

  if (status === 401 && message.includes('Bad credentials')) {
    throw new InvalidCredentials();
  }

  if (status === 403 && message.includes('API rate limit')) {
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    const remainingRateLimit = rateLimitReset - Date.now() / 1000;
    throw new RateLimitError(remainingRateLimit);
  }

  if (
    status === 422 &&
    firstErrorMessage.includes('do not exist or you do not have permission')
  ) {
    throw new NeedTokenError();
  }
};
