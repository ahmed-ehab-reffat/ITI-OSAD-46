import { Text } from './text';
import { Bold } from './bold';
import { Italic } from './italic';
import { Underline } from './underline';

const text1 = new Italic(new Bold(new Text()));
const text2 = new Italic(new Underline(new Text()));

console.log(text1.process());
console.log(text2.process());
