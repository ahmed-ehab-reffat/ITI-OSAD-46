import { AuthType } from './authType';
import { Credentials } from './credentials';

export interface AuthMethod {
  auth(): void;
}

export interface AuthMethodFactory {
  createAuthMethod(authType: AuthType, credentials: Credentials): AuthMethod;
}
