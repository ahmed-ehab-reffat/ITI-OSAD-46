import { SubscriptionType } from './subscriptionType';
import { Blog } from './blog';
import { Subscriber } from './subscriber';
import { NewsLetter } from './newsLetter';

export class BlogManagement {
  #subscribers: Map<SubscriptionType, Subscriber[]>;
  #blogs: Blog[];
  #newsLetters: NewsLetter[];

  constructor() {
    this.#subscribers = new Map<SubscriptionType, Subscriber[]>();
    this.#subscribers.set('BLOG', []);
    this.#subscribers.set('NEWSLETTER', []);

    this.#blogs = [];
    this.#newsLetters = [];
  }

  subscribe(event: SubscriptionType, subscriber: Subscriber) {
    const subs = this.#subscribers.get(event);

    if (!subs) return;

    subs.push(subscriber);
  }

  unSubscribe(event: SubscriptionType, subscriber: Subscriber) {
    const subs = this.#subscribers.get(event);

    if (!subs) return;

    const idx = subs.indexOf(subscriber);

    if (idx > -1) this.#subscribers.get(event)?.splice(idx, 1);
  }

  notifySubs(event: SubscriptionType, message: string) {
    const subs = this.#subscribers.get(event);

    if (!subs) return;

    subs.forEach((sub) => {
      sub.notify(message);
    });
  }

  addPost(blog: Blog) {
    this.#blogs.push(blog);

    this.notifySubs('BLOG', `new post: ${blog.title}`);
  }

  addWeekly(newsLetter: NewsLetter) {
    this.#newsLetters.push(newsLetter);

    this.notifySubs('NEWSLETTER', `new weekly: ${newsLetter.content}`);
  }
}
