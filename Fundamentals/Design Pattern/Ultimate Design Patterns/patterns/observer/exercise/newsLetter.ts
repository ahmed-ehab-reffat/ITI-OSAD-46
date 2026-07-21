export class NewsLetter {
  #content: string;

  constructor(content: string) {
    this.#content = content;
  }

  public get content(): string {
    return this.#content;
  }
}
