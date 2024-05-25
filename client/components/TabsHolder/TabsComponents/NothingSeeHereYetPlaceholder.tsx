import { Paper, Text } from '@mantine/core';

export const NothingSeeHereYetPlaceholder = () => {
  return (
    <div>
      <Paper shadow="xl" radius="xl" withBorder p="xl" mt={5}>
        <Text ta="center" fz="xl" fw={600} color="black">
          Oops... It seems that there is nothing to see here yet.
        </Text>
        <Text ta="center" fz="md" fw={400} color="black">
          Let's try later! We hope this group would give you more info next time.
        </Text>
      </Paper>
    </div>
  );
};
