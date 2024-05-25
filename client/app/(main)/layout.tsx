import '@mantine/core/styles.css';
import React from 'react';

import '../global.css';
import { BauPageLayout } from '@/components/AppShell/AppShell';

export const metadata = {
  title: 'a/',
  description: 'desc',
};

export default function MainLayout({ children }: { children: any }) {
  return <BauPageLayout children={children} />;
}
