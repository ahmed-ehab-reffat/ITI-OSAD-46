const MySecretToken = Symbol('MySecretToken');

export class SessionManager {
  static #instance: SessionManager;

  #setting: number = 0;

  private constructor(token: symbol) {
    if (token !== MySecretToken) {
      throw new Error(
        'Cannot construct directly. Use SingletonService.getInstance()'
      );
    }
  }

  public static getInstance(): SessionManager {
    if (!this.#instance) {
      this.#instance = new SessionManager(MySecretToken);
    }

    return this.#instance;
  }

  public set setting(v: number) {
    this.#setting = v;
  }

  public get setting(): number {
    return this.#setting;
  }
}
