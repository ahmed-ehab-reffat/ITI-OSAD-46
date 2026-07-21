import { AuthMethod, AuthMethodFactory } from './authMethodFactory';
import { AuthType } from './authType';
import { Credentials } from './credentials';

export class Authenticator {
  #authMethodFactory: AuthMethodFactory;

  constructor(authMethodFactory: AuthMethodFactory) {
    this.#authMethodFactory = authMethodFactory;
  }

  authenticate(authType: AuthType, credentials: Credentials): void {
    const authMethod: AuthMethod = this.#authMethodFactory.createAuthMethod(
      authType,
      credentials
    );

    authMethod.auth();
  }
}
