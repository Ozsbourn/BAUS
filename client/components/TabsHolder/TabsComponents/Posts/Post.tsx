'use client';

import { getFormatDate } from '@/lib/utils/dateFormatter';
import { Flex, Image, Paper, Text } from '@mantine/core';
import { IconPlaceholder } from '@tabler/icons-react';

interface PostProps {
  label?: string | null;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export const Post = (props: PostProps) => {
  const published = getFormatDate(props.createdAt);
  const updated = props.updatedAt ? getFormatDate(props.updatedAt) : undefined;

  return (
    <div>
      <Paper shadow="xl" radius="xl" withBorder p="xl" mt={5}>
        {props.label && (
          <Text ta="left" fz="xl" fw={400} color="black">
            {props.label}
          </Text>
        )}
        <Text ta="left" fz="md" fw={300} color="black">
          {props.content}
        </Text>

        <Image src={'https://placehold.co/600x400'} h={400} w={600} />

        <Flex mih={50} gap="sm" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
          <Text ta="left">Published at: {published}</Text>
          {props.updatedAt && <Text ta="left">Updated at: {updated!}</Text>}
        </Flex>
      </Paper>
    </div>
  );
};
