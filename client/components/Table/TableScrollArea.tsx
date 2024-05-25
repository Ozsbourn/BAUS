'use client';

import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  Button,
  Flex,
  Modal,
  Stack,
  TextInput,
  Group,
  Textarea,
  Checkbox,
  Avatar,
  Anchor,
} from '@mantine/core';
import classes from './TableScrollArea.module.css';
import { useDisclosure } from '@mantine/hooks';
import { GroupInfo } from '@/lib/types/groupTypes/groupInfo';
import { useStores } from '@/lib/store/useStore';
import { ExtendedGroupInfo, createNewGroup, deleteCurrGroup } from '@/lib/groups/utils';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { URLs } from '@/configs/urls';
import { notifications } from '@mantine/notifications';
import { ClientUrl } from '@/configs/clientUrl';
import { useRouter } from 'next/navigation';
import { IconSettings, IconTrash } from '@tabler/icons-react';

interface IReducedGroupInfo {
  id: string;
  name: string;
  urlName: string;
  status: string;
  avatarUrl: string;
}
type GroupListResponse = {
  userId: string;
  userRole: string;
  group: IReducedGroupInfo;
};

export function TableScrollArea() {
  const [opened, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GroupInfo>({
    groupId: '',
    name: '',
    urlName: '',
    description: '',
    avatarUrl: '',
    bannerUrl: '',
    status: '',
  });
  const {
    userStore: { getUserInfo },
  } = useStores();
  const [groupList, setGroupList] = useState<GroupListResponse[]>([]);
  const router = useRouter();

  const rows = groupList.map((row: GroupListResponse) => (
    <Table.Tr key={row.group.urlName}>
      <Table.Td>
        <Group>
          <Avatar src={row.group.avatarUrl} />
          <Button onClick={() => router.push(ClientUrl.GroupPage + `${row.group.urlName}`)}>
            {row.group.name}
          </Button>
        </Group>
      </Table.Td>
      <Table.Td>
        <div onClick={() => router.push(ClientUrl.GroupPage + `${row.group.urlName}`)}>
          {row.group.urlName}
        </div>
      </Table.Td>
      <Table.Td>{row.userRole}</Table.Td>
      <Table.Td>{row.group.status}</Table.Td>
      <Table.Td>(Here should be an equity data)</Table.Td>
      <Table.Td>
        {row.group.status !== 'DELETED' && (
          <>
            <IconSettings stroke={2} />
            <IconTrash onClick={() => deleteCurrGroup(row.group.id)} stroke={2} color="#f84444" />
          </>
        )}
      </Table.Td>
    </Table.Tr>
  ));
  const serveGroupCreation = () => {
    const { userId } = getUserInfo();
    const extInfo: ExtendedGroupInfo = {
      userId: userId,
      ...groupInfo,
    };
    createNewGroup(extInfo);
    fetchData();
  };
  const fetchData = () => {
    const { userId } = getUserInfo();
    axios
      .get(URLs.getAll, {
        params: {
          userId: userId,
        },
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setGroupList(res.data);
      })
      .catch((err: AxiosError) => {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.response?.data.message,
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create a new group" centered>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Type a name for your new group"
            value={groupInfo.name}
            onChange={(event) => setGroupInfo({ ...groupInfo, name: event.currentTarget.value })}
            radius="md"
            maxLength={100}
          />
          <TextInput
            required
            label="Group ID"
            placeholder="Type a short name for your group"
            value={groupInfo.urlName}
            onChange={(event) => setGroupInfo({ ...groupInfo, urlName: event.currentTarget.value })}
            radius="md"
            maxLength={20}
          />
          <Textarea
            label="Description"
            placeholder="Type a short name for your group"
            value={groupInfo.description}
            onChange={(event) =>
              setGroupInfo({ ...groupInfo, description: event.currentTarget.value })
            }
            radius="md"
            maxLength={300}
          />

          <Checkbox label="Are you agree with our terms of service and rules?" />

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="md" size="md" onClick={() => serveGroupCreation()}>
              Save
            </Button>
            <Button type="submit" radius="md" size="md" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Group justify="space-between" align="center">
        <Text ta="left" fz="lg" fw="500" mt="sm">
          Your groups are here:
        </Text>
        <Button mr={55} onClick={open}>
          Create a group
        </Button>
      </Group>
      <ScrollArea mt="lg" h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Group Name</Table.Th>
              <Table.Th>Group ID</Table.Th>
              <Table.Th>Your role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Your equity</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
