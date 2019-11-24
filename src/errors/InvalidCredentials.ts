import ExtendableError from 'es6-error';

export class InvalidCredentials extends ExtendableError {
  constructor(message = 'Your token seems to be invalid') {
    super(message);
  }
}
