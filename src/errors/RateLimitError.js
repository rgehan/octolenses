import ExtendableError from 'es6-error';

export class RateLimitError extends ExtendableError {
  constructor(message = 'Rate limited. Set a Github token to raise the limit') {
    super(message);
  }
}
