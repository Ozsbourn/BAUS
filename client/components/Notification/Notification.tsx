import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
import { BauNotificationProps } from '@/lib/types/componentsTypes/notifications/notificationsTypes';

export const BauNotification = (props: BauNotificationProps) => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return props.icon === 'success' ? (
    <Notification color={props.color} title={props.title} icon={checkIcon}>
      {props.message}
    </Notification>
  ) : (
    <Notification color={props.color} title={props.title} icon={xIcon}>
      {props.message}
    </Notification>
  );
};
