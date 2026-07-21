import { AuthMethod, AuthMethodFactory } from '../core/authMethodFactory';
import { AuthType } from '../core/authType';
import { Biometric } from './biometric';
import { biometricCredentials } from '../core/credentials';
import { Hardware } from './hardware';

export class TwoFactorAuthMethodFactory implements AuthMethodFactory {
  createAuthMethod(
    authType: AuthType,
    { key }: biometricCredentials
  ): AuthMethod {
    if (authType === AuthType.HARDWARE) return new Hardware(key);
    if (authType === AuthType.BIOMETRIC) return new Biometric(key);
    throw new Error('Authentication type is not supported.');
  }
}
