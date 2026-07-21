import { User } from './user';

export interface NotificationStrategy {
  sendNotification(user: User, message: string): void;
}

export class NotificationService implements NotificationStrategy {
  #startegy: NotificationStrategy;

  constructor(strategy: NotificationStrategy) {
    this.#startegy = strategy;
  }

  sendNotification(user: User, message: string): void {
    this.#startegy.sendNotification(user, message);
  }
}
