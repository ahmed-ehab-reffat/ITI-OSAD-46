import { CompositeDecorator } from './compositeDecorator';
import { TextProcessor } from './textProcessor';

export class Bold extends CompositeDecorator {
  constructor(textProcessor: TextProcessor) {
    super(textProcessor);
  }

  override process(): string {
    return super.process() + ' Bold';
  }
}
