const CLIENT_ID = 'Iv23liyrmCd7uOo8GKid';

const DEVICE_CODE_URL = 'https://github.com/login/device/code';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export interface IDeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

/**
 * Start a device flow authentication, returning a user code that
 * the user has to enter on the verification page.
 * https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-cli-with-a-github-app#authorize-the-cli-with-the-device-flow
 */
export const requestDeviceCode = async (): Promise<IDeviceCodeResponse> => {
  // The body is form-encoded to avoid a CORS preflight, which GitHub
  // rejects on this endpoint
  const response = await fetch(DEVICE_CODE_URL, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new URLSearchParams({ client_id: CLIENT_ID }),
  });

  if (!response.ok) {
    throw new Error(`Could not initiate the GitHub device flow`);
  }

  return response.json();
};

/**
 * Poll GitHub until the user has approved (or denied) the device,
 * and resolve with an access token.
 */
export const pollForToken = async (
  deviceCode: string,
  interval: number
): Promise<string> => {
  // GitHub can ask us to slow down, in which case the delay increases
  let delay = interval;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await sleep(delay * 1000);

    const response = await fetch(ACCESS_TOKEN_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        device_code: deviceCode,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    }

    switch (data.error) {
      case 'authorization_pending':
        break;
      case 'slow_down':
        delay = data.interval || delay + 5;
        break;
      case 'expired_token':
        throw new Error('The code expired, please try signing in again');
      case 'access_denied':
        throw new Error('The authorization request was denied');
      default:
        throw new Error(data.error_description || 'GitHub sign-in failed');
    }
  }
};

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
