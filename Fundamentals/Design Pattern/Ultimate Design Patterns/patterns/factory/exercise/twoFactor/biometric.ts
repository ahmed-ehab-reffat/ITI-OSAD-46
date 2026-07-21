import { TwoFactorAuthMethod } from './authMethod';

export class Biometric extends TwoFactorAuthMethod {
  constructor(key: string) {
    super(key);
  }

  auth(): void {
    console.log(`Login using Biometric: ${this.key}`);
  }
}
