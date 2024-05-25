export type NotificationIconStyle = 'success' | 'error';

export type BauNotificationProps = {
  icon: NotificationIconStyle;
  color: string;
  title: string;
  message: string;
};
