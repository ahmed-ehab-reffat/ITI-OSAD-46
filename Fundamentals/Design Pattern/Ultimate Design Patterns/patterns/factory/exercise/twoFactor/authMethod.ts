import { AuthMethod } from '../core/authMethodFactory';

export abstract class TwoFactorAuthMethod implements AuthMethod {
  #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  protected get key(): string {
    return this.#key;
  }

  abstract auth(): void;
}
