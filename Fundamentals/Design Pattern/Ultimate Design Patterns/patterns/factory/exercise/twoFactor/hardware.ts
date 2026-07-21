import { TwoFactorAuthMethod } from './authMethod';

export class Hardware extends TwoFactorAuthMethod {
  constructor(key: string) {
    super(key);
  }

  auth(): void {
    console.log(`Login using Hardware: ${this.key}`);
  }
}
