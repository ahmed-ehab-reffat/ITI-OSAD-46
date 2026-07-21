import { AuthMethod } from '../core/authMethodFactory';

export abstract class SocialAuthMethod implements AuthMethod {
  #account: string;

  constructor(account: string) {
    this.#account = account;
  }

  protected get account(): string {
    return this.#account;
  }

  abstract auth(): void;
}
