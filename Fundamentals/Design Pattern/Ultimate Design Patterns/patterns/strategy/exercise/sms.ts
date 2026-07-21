import { NotificationStrategy } from './notificationService';
import { User } from './user';

export class SMS implements NotificationStrategy {
  sendNotification(user: User, message: string): void {
    console.log(`SMS notification to ${user.name}: ${message}`);
  }
}
