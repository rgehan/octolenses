import { Migration } from './index';

export default class extends Migration {
  public name = 'v1-to-v2';

  public shouldRun(): boolean {
    throw new Error('Method not implemented.');
  }

  public run() {
    throw new Error('Method not implemented.');
  }
}
