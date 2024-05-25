import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

import './global.css';
import { StoreWrapper } from '@/store/StoreProvider/StoreProvider';

export const metadata = {
  title: 'a/',
  description: 'desc',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <StoreWrapper>
            <Notifications limit={5} position="bottom-right" zIndex={1000} />
            {children}
          </StoreWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
