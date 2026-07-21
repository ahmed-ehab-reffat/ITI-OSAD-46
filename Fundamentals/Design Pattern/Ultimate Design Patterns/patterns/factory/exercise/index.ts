import { Authenticator } from './core/authenticator';
import { AuthType } from './core/authType';
import { SocialAuthMethodFactory } from './social/authMethodFactory';
import { TwoFactorAuthMethodFactory } from './twoFactor/authMethodFactory';
import { UsernameAuthMethodFactory } from './username/authMethodFactory';

const usernameAuthenticator = new Authenticator(
  new UsernameAuthMethodFactory()
);
usernameAuthenticator.authenticate(AuthType.USERNAME, {
  username: 'ahmed',
  password: 'P@$$w0rd'
});

const socialAuthenticator = new Authenticator(new SocialAuthMethodFactory());
socialAuthenticator.authenticate(AuthType.INSTAGRAM, { account: '@ahmed' });
socialAuthenticator.authenticate(AuthType.FACEBOOK, { account: '@ehab' });

const twoFactorAuthenticator = new Authenticator(
  new TwoFactorAuthMethodFactory()
);
twoFactorAuthenticator.authenticate(AuthType.HARDWARE, {
  key: 'bluetooth'
});
twoFactorAuthenticator.authenticate(AuthType.BIOMETRIC, {
  key: 'fingerprint'
});

// twoFactorAuthenticator.authenticate(AuthType.USERNAME, {
//   username: 'ahmed',
//   password: 'P@$$w0rd'
// });
