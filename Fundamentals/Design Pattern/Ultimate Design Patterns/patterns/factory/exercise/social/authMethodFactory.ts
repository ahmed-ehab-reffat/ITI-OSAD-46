import { AuthMethod, AuthMethodFactory } from '../core/authMethodFactory';
import { Facebook } from './facebook';
import { Instagram } from './instagram';
import { AuthType } from '../core/authType';
import { socialCredentials } from '../core/credentials';

export class SocialAuthMethodFactory implements AuthMethodFactory {
  createAuthMethod(
    authType: AuthType,
    { account }: socialCredentials
  ): AuthMethod {
    if (authType === AuthType.FACEBOOK) return new Facebook(account);
    if (authType === AuthType.INSTAGRAM) return new Instagram(account);
    throw new Error('Authentication type is not supported.');
  }
}
