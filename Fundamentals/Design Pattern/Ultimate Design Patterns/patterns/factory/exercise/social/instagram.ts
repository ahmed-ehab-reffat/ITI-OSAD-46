import { SocialAuthMethod } from './authMethod';

export class Instagram extends SocialAuthMethod {
  constructor(account: string) {
    super(account);
  }

  auth(): void {
    console.log(`Login using Instagram account: ${this.account}`);
  }
}
