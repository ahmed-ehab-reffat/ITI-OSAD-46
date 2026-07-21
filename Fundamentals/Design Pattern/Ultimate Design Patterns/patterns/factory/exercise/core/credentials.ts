export type usernameCredentials = {
  username: string;
  password: string;
};

export type socialCredentials = {
  account: string;
};

export type biometricCredentials = {
  key: string;
};

export type Credentials =
  | usernameCredentials
  | socialCredentials
  | biometricCredentials;
