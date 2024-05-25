import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'a/g/:id/s',
  description: 'desc',
};

export default function GroupSettingsPageLayout({ children }: { children: any }) {
  return (
    <div>
      <MantineProvider>{children}</MantineProvider>
    </div>
  );
}
