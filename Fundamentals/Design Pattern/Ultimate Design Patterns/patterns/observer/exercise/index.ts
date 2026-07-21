import { Customer } from './customer';
import { Blog } from './blog';
import { NewsLetter } from './newsLetter';
import { BlogManagement } from './blogManagement';

const blogManagement = new BlogManagement();

const ahmed = new Customer('Ahmed');
const mahmoud = new Customer('Mahmoud');
const youssef = new Customer('Youssef');

blogManagement.subscribe('BLOG', ahmed);
blogManagement.subscribe('NEWSLETTER', ahmed);
blogManagement.subscribe('BLOG', mahmoud);
blogManagement.subscribe('NEWSLETTER', youssef);

blogManagement.addPost(new Blog('Design Patterns'));
blogManagement.addWeekly(new NewsLetter('Observer Pattern'));
