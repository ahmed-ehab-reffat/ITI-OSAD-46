const MySecretToken = Symbol('MySecretToken');

export class Game {
  readonly #graphics: string;
  readonly #sound: string;
  readonly #control: string;

  private constructor(
    token: symbol,
    builder: InstanceType<typeof Game.Builder>
  ) {
    if (token !== MySecretToken) {
      throw new Error('Cannot construct directly. Use Game.Builder()');
    }

    this.#graphics = builder.graphics;
    this.#sound = builder.sound;
    this.#control = builder.control;
  }

  get sound(): string {
    return this.#sound;
  }

  get control(): string {
    return this.#control;
  }

  get graphics(): string {
    return this.#graphics;
  }

  static Builder = class {
    #graphics: string = '';
    #sound: string = '';
    #control: string = '';

    constructor() {}

    setGraphics(v: string) {
      this.#graphics = v;
      return this;
    }

    setSound(v: string) {
      this.#sound = v;
      return this;
    }

    setControl(v: string) {
      this.#control = v;
      return this;
    }

    get graphics(): string {
      return this.#graphics;
    }

    get sound(): string {
      return this.#sound;
    }

    get control(): string {
      return this.#control;
    }

    build(): Game {
      return new Game(MySecretToken, this);
    }
  };
}
