'use client';

import { Card, Avatar, Text, Group, Button, CardSection } from '@mantine/core';
import classes from './UserProfile.module.css';

const stats = [
  { value: '3.4K', label: 'Followers' },
  { value: '187', label: 'Orders' },
  { value: '120', label: 'Posts' },
];

export function UserProfile() {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <CardSection
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />

      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={90}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />

      <Text ta="center" fz="lg" fw={500} mt="sm">
        Bill Headbanger
      </Text>
      <Text ta="center" fz="xs" c="dimmed">
        Fullstack engineer
      </Text>

      {/* Items */}
      <Group mt="xs" justify="center" gap={30}>
        {items}
      </Group>
      {/* Flow manage buttons */}
      <Group mt="xs" justify="center" gap={30}>
        <Button radius="md" mt="xs" size="md" variant="default">
          Follow
        </Button>
        <Button radius="md" mt="xs" size="md" variant="default">
          Write a Message
        </Button>
      </Group>
    </Card>
  );
}
