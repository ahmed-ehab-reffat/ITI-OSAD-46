const messengerNotification = new MessengerNotificationBuilder()
  .setContent('Hello World')
  .setSender('John Doe')
  .setRecipient('Jane Doe')
  .setTimestamp('2023-01-01T00:00:00.000Z')
  .setAttachment(['https://dummyjson.com/image/600x400'])
  .setTheme('DARK')
  .build();

console.log(messengerNotification.getContent());
