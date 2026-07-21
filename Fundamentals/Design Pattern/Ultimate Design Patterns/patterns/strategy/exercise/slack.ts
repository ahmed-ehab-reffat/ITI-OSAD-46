import { NotificationStrategy } from './notificationService';
import { User } from './user';

export class Slack implements NotificationStrategy {
  sendNotification(user: User, message: string): void {
    console.log(`Slack notification to ${user.name}: ${message}`);
  }
}
