import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

class NotificationManager {
  static add(type: NotificationType, message: string, description: string) {
    notification[type]({
      message: message,
      description: description,
      placement: 'topRight',
    });
  }
}

export default NotificationManager;
