'use client';

import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '../Error.module.css';
import { useRouter } from 'next/router';

export function ServerError() {
  const router = useRouter();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You've just reached this secret place!</Title>
        <Text size="lg" ta="center" className={classes.description}>
          There aren&apos;t anything here tho, only 404 page... Don&apos;t worry, you may have
          mistyped the address, or the page has been moved to another URL.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md" onClick={() => router.back()}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
