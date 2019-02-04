import ExtendableError from 'es6-error';

export class RateLimitError extends ExtendableError {
  constructor(remainingRateLimit) {
    super('Rate limited. Set a Github token to raise the limit');
    this.remainingRateLimit = Math.round(remainingRateLimit);
  }
}
