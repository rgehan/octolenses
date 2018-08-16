import ExtendableError from 'es6-error';

export class NeedTokenError extends ExtendableError {
  constructor(message = 'Fetching failed. Try to set a Github token') {
    super(message);
  }
}
