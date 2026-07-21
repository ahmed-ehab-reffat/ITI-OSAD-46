import { SocialAuthMethod } from './authMethod';

export class Facebook extends SocialAuthMethod {
  constructor(account: string) {
    super(account);
  }

  auth(): void {
    console.log(`Login using Facebook account: ${this.account}`);
  }
}
