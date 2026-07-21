import { NotificationStrategy } from './notificationService';
import { User } from './user';

export class Messenger implements NotificationStrategy {
  sendNotification(user: User, message: string): void {
    console.log(`Messenger notification to ${user.name}: ${message}`);
  }
}
