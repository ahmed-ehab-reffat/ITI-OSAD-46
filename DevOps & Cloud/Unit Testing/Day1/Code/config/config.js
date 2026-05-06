const DEFAULTS = {
    theme:    'light',
    language: 'en',
    notifications: { email: true, sms: false },
  };

  const allowedFields = ['theme', 'language', 'notifications'];
  const allowedNotificationsFields = ['email', 'sms'];
  
  function buildConfig(userPrefs = {}) {

    Object.entries(userPrefs).forEach(([key, value]) => {
      if (!allowedFields.includes(key)) {
        delete userPrefs[key];
      }
      if (key === 'notifications') {
        Object.entries(value).forEach(([notificationKey, notificationValue]) => {
          if (!allowedNotificationsFields.includes(notificationKey)) {
            delete value[notificationKey];
          }
        });
      }
    });
    
    return {
      ...DEFAULTS,
      ...userPrefs,
      notifications: {
        ...DEFAULTS.notifications,
        ...userPrefs.notifications,
      },
    };
  }
  
  module.exports = { buildConfig };