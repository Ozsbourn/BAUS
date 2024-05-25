'use client';

import { AppShell, Button, ScrollArea, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  RenderSettingsComponentResolver,
  renderComponentsResolve,
} from './RenderComponentsResolver';
import { useState } from 'react';

/* margin to auto  */

export function GroupSettings() {
  const [opened, { toggle }] = useDisclosure();
  const [resolverState, setResolverState] = useState<RenderSettingsComponentResolver>('');

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md" m="auto">
        <AppShell.Section>Settings</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Button
            fullWidth
            justify="left"
            variant="light"
            size="md"
            onClick={() => setResolverState('INVITATION')}
          >
            Invitations
          </Button>
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={true} />
            ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {resolverState ? (
          <> {renderComponentsResolve(resolverState)} </>
        ) : (
          <Text>Choose an option to set settings of it</Text>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
