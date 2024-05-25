'use client';

import { AppShell, Button, Group } from '@mantine/core';
import { observer } from 'mobx-react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useStores } from '@/lib/store/useStore';
import { useRouter } from 'next/navigation';

export const BauPageLayout = observer(({ children }: { children: any }) => {
  const {
    userStore: { isUserAuthorized, getUserInfo },
  } = useStores();
  const router = useRouter();

  const resolver = (way: string) => {
    if (!isUserAuthorized()) {
      router.push('/login');
    } else {
      const userInfo = getUserInfo();
      switch (way) {
        // case 'PageBuilder': {
        //   router.push(`/builder/1`);
        //   break;
        // }
        case 'UserPage': {
          router.push(`/profile/${userInfo.login}`);
          break;
        }
        case 'Auth': {
          router.push(`/login`);
          break;
        }
        case 'FlowGraph': {
          router.push(`/flowgraph/1`);
          break;
        }
        case 'GroupDash': {
          router.push(`/group/dashboard`);
          break;
        }
      }
    }
  };

  return (
    <AppShell header={{ height: 45 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          {/*<Button onClick={() => resolver('PageBuilder')}>PageBuilder</Button>*/}
          <Button onClick={() => resolver('UserPage')}>UserPage</Button>
          <Button onClick={() => resolver('Auth')}>Auth</Button>
          <Button onClick={() => resolver('FlowGraph')}>FlowGraph</Button>
          <Button onClick={() => resolver('GroupDash')}>GroupDash</Button>

          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
});
