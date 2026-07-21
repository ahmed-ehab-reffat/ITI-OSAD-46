import { UsernameAuthMethod } from './authMethod';

export class Username extends UsernameAuthMethod {
  constructor(username: string, password: string) {
    super(username, password);
  }

  auth(): void {
    console.log(
      `Login using Username: ${this.username} - Password: ${this.password}`
    );
  }
}
