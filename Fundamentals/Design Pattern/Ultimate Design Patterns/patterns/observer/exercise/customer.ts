import { Subscriber } from './subscriber';

export class Customer implements Subscriber {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  public get name(): string {
    return this.#name;
  }

  public notify(message: string): void {
    console.log(`Notifying customer: ${this.name} about: ${message}`);
  }
}
