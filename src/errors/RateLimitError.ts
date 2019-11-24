import ExtendableError from 'es6-error';

export class RateLimitError extends ExtendableError {
  public remainingRateLimit: number;

  constructor(remainingRateLimit: number) {
    super('Rate limited. Set a Github token to raise the limit');
    this.remainingRateLimit = Math.round(remainingRateLimit);
  }
}
