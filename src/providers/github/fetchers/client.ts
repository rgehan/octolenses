import { get, pickBy } from 'lodash';

import {
  InvalidCredentials,
  NeedTokenError,
  RateLimitError,
} from '../../../errors';

interface IClientParams {
  endpoint: string;
  token?: string;
  qs?: string;
  body?: string;
  method?: 'GET' | 'POST';
}

/**
 * Fetch data from GitHub API
 */
export const client = async ({
  endpoint,
  token,
  qs,
  body,
  method = 'GET',
}: IClientParams) => {
  const url = `https://api.github.com${endpoint}?${qs || ''}`;

  const response = await fetch(url, {
    body: method === 'POST' ? body : undefined,
    method,
    headers: pickBy({
      'User-Agent': 'OctoLenses Github Dashboard',
      Authorization: token && `Bearer ${token}`,
      Accept: 'application/vnd.github.antiope-preview+json', // Allow access to Previews API
    }),
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return await response.json();
};

/**
 * Handle an error response from GitHub API
 */
const handleErrorResponse = async (response: Response) => {
  const status = response.status;
  const { message = '', errors = [] } = await response.json();

  const firstErrorMessage = get(errors, '0.message', '');

  if (status === 401 && message.includes('Bad credentials')) {
    throw new InvalidCredentials();
  }

  if (status === 403 && message.includes('API rate limit')) {
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    const remainingRateLimit = Number(rateLimitReset) - Date.now() / 1000;
    throw new RateLimitError(remainingRateLimit);
  }

  if (
    status === 422 &&
    firstErrorMessage.includes('do not exist or you do not have permission')
  ) {
    throw new NeedTokenError();
  }
};
