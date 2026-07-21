import { AuthMethod } from '../core/authMethodFactory';

export abstract class UsernameAuthMethod implements AuthMethod {
  #username: string;
  #password: string;

  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;
  }

  protected get username(): string {
    return this.#username;
  }
  protected get password(): string {
    return this.#password;
  }

  abstract auth(): void;
}
