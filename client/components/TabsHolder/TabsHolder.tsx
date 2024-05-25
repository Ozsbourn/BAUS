'use client';

import { Text, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconCarouselVertical, IconNews, IconSettings } from '@tabler/icons-react';
import classes from './TabsHolder.module.css';
import { LandingPage } from './TabsComponents/LandingPage';
import { SettingsTab } from './TabsComponents/Settings';
import { Post } from './TabsComponents/Posts/Post';
import { PostsFeed } from './TabsComponents/Posts/PostsFeed';

export function TabsHolder() {
  return (
    <Tabs defaultValue="landing">
      <TabsList grow>
        <TabsTab
          value="landing"
          leftSection={<IconCarouselVertical className={classes.iconStyle} />}
        >
          Landing Page
        </TabsTab>
        <TabsTab value="posts" leftSection={<IconNews className={classes.iconStyle} />}>
          Posts
        </TabsTab>
        <TabsTab value="faq" leftSection={<IconNews className={classes.iconStyle} />}>
          F.A.Q.
        </TabsTab>
        <TabsTab value="settings" leftSection={<IconSettings className={classes.iconStyle} />}>
          Settings
        </TabsTab>
      </TabsList>

      <TabsPanel value="landing">
        {/*<Text ta="center" fz="xs" c="dimmed">
          Here should be Some Content
        </Text>*/}
        <LandingPage />
        {/*<Render/>*/}
      </TabsPanel>

      <TabsPanel value="posts">
        <PostsFeed />
      </TabsPanel>

      <TabsPanel value="faq">
        <Text ta="center" fz="xs" c="dimmed">
          Here should be Some Another Other Content
        </Text>
      </TabsPanel>

      <TabsPanel value="settings">
        <SettingsTab />
      </TabsPanel>
    </Tabs>
  );
}
