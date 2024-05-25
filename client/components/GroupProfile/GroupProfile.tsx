'use client';

import { Card, Avatar, Text, Group, Button, CardSection } from '@mantine/core';
import classes from './GroupProfile.module.css';
import { useEffect, useState } from 'react';
import { GroupAccountStatus } from '@/lib/types/groupTypes/groupStatuses';
import { observer } from 'mobx-react';
import { usePathname } from 'next/navigation';
import { getGroup, getPermissions } from '@/lib/groups/utils';
import { GroupInfoWithTimestamps } from '@/lib/types/groupTypes/groupInfo';
import { useStores } from '@/lib/store/useStore';
import { UserInGroupRequest } from '@/lib/types/groupTypes/permissionsTypes';
import { RoleInGroup } from '@/lib/types/groupTypes/rolesInGroup';

const stats = [
  { value: '{stat.val}', label: '{stat.label1}' },
  { value: '{stat.val}', label: '{stat.label2}' },
  { value: '{stat.val}', label: '{stat.label3}' },
];

// interface IGroupInfo {
//   urlName: string;
//   name: string;
//   createdAt: string;
//   avatarUrl: string;
//   bannerUrl: string;
//   status: GroupAccountStatus;
// }

export const GroupProfile = observer(() => {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));
  const [groupInfo, setGroupInfo] = useState<GroupInfoWithTimestamps>();
  const pathname = usePathname();
  const {
    userStore: { getUserInfo },
    groupStore: { setFullGroupInfo, getFullGroupInfo },
  } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      const uriEntities = pathname.split('/');
      const groupInfo: GroupInfoWithTimestamps = await getGroup(uriEntities[2]);
      setGroupInfo(groupInfo);
      setFullGroupInfo(groupInfo);

      const tmp: UserInGroupRequest = {
        userLogin: getUserInfo().login,
        groupUrlName: getFullGroupInfo().urlName,
      };
      // const res = await getPermissions(tmp);
      await getPermissions(tmp);
    };

    fetchData();
  }, []);

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <CardSection
        h={140}
        style={{
          backgroundImage: `url(${groupInfo?.bannerUrl})`,
        }}
      />

      <Avatar
        src={`${groupInfo?.avatarUrl}`}
        size={90}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />

      <Text ta="center" fz="lg" fw={500} mt="sm">
        {groupInfo?.name}
      </Text>
      <Text ta="center" fz="xs" c="dimmed">
        @{groupInfo?.urlName}
      </Text>

      {/* Stats */}
      <Group mt="xs" justify="center" gap={30}>
        {items}
      </Group>
      {/* Flow manage buttons */}
      <Group mt="xs" justify="center" gap={30}>
        <Button radius="md" mt="xs" size="md" variant="default">
          Follow
        </Button>
        <Button radius="md" mt="xs" size="md" variant="default">
          Write a Message
        </Button>
      </Group>
    </Card>
  );
});
