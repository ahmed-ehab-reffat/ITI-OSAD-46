import { TextProcessor } from './textProcessor';

export abstract class CompositeDecorator implements TextProcessor {
  constructor(private textProcessor: TextProcessor) {}

  process(): string {
    return this.textProcessor.process();
  }
}
