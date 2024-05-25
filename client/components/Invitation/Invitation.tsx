import { Button, Text, Paper } from '@mantine/core';
import classes from './Invitation.module.css';

export const Invitation = () => {
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} shadow="xl" radius="xl" withBorder p="xl">
        <Text>You was invited to {'{here should be name}'} group!</Text>
        <Text>Please click on a button below to accept an invitation</Text>

        <Button justify="center" size="md" radius="sm" mt={30} fullWidth>
          Accept invitation
        </Button>
      </Paper>
    </div>
  );
};
