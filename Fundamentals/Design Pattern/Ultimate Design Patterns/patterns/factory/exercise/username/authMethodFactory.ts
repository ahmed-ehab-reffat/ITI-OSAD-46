import { AuthMethod, AuthMethodFactory } from '../core/authMethodFactory';
import { AuthType } from '../core/authType';
import { usernameCredentials } from '../core/credentials';
import { Username } from './username';

export class UsernameAuthMethodFactory implements AuthMethodFactory {
  createAuthMethod(
    authType: AuthType,
    { username, password }: usernameCredentials
  ): AuthMethod {
    if (authType === AuthType.USERNAME) return new Username(username, password);
    throw new Error('Authentication type is not supported.');
  }
}
