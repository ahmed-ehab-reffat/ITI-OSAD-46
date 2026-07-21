import { NotificationService } from './notificationService';
import { Slack } from './slack';
import { SMS } from './sms';
import { User } from './user';

const slackNotificationService: NotificationService = new NotificationService(
  new Slack()
);

slackNotificationService.sendNotification(new User('Ahmed'), 'Hello, World!');

const smsNotificationService: NotificationService = new NotificationService(
  new SMS()
);

smsNotificationService.sendNotification(new User('Ahmed'), 'Hello, World!');
