import { NotificationStrategy } from './notificationService';
import { User } from './user';

export class Email implements NotificationStrategy {
  sendNotification(user: User, message: string): void {
    console.log(`Email notification to ${user.name}: ${message}`);
  }
}
