import { CompositeDecorator } from './compositeDecorator';
import { TextProcessor } from './textProcessor';

export class Underline extends CompositeDecorator {
  constructor(textProcessor: TextProcessor) {
    super(textProcessor);
  }

  process(): string {
    return super.process() + ' Underline';
  }
}
