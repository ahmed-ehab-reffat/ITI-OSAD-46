export class Blog {
  #title: string;

  constructor(title: string) {
    this.#title = title;
  }

  public get title(): string {
    return this.#title;
  }
}
