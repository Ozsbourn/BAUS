'use client';

import { Button } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

export const SettingsTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirectToGroupSettings = () => {
    router.push(pathname + '/settings');
  };

  return (
    <>
      <Button radius="md" mt="xs" size="md" variant="default">
        Tabs settings
      </Button>
      <Button radius="md" mt="xs" size="md" variant="default" onClick={redirectToGroupSettings}>
        Group settings
      </Button>
    </>
  );
};
